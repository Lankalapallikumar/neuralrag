from fastapi import APIRouter

import razorpay

from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)

from app.models.user import (
    User
)

router = APIRouter()

# RAZORPAY CLIENT
client = razorpay.Client(

    auth=(

        "rzp_test_SuPfiMl421OjIs",

        "EnI5sjQxBR27YVpLuJY7tdcs"

    )

)


# CREATE ORDER
@router.post("/create-order")
def create_order():

    try:

        order = client.order.create({

            "amount":
            19900,

            "currency":
            "INR",

            "payment_capture":
            1

        })

        return order

    except Exception as e:

        return {

            "error":
            str(e)

        }


# VERIFY PAYMENT
@router.post("/verify-payment")
def verify_payment(data: dict):

    db: Session = SessionLocal()

    try:

        # VERIFY SIGNATURE
        client.utility.verify_payment_signature({

            "razorpay_order_id":
            data["razorpay_order_id"],

            "razorpay_payment_id":
            data["razorpay_payment_id"],

            "razorpay_signature":
            data["razorpay_signature"]

        })

        # FIND USER
        user = db.query(User).filter(

            User.id == data["user_id"]

        ).first()

        if not user:

            return {

                "error":
                "User not found"

            }

        # ACTIVATE PRO
        user.is_pro = True

        # RESET FREE LIMIT
        user.free_queries_used = 0

        db.commit()

        return {

            "message":
            "Payment verified successfully",

            "is_pro":
            True,

            "user_id":
            user.id

        }

    except Exception as e:

        return {

            "error":
            str(e)

        }
