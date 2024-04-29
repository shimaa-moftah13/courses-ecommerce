import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { CartContext } from '../../_context/CartContext';
import { useUser } from '@clerk/nextjs';
import OrderApi from '../../_utils/OrderApis'
import CartApis from '../../_utils/CartApis';
const CheckoutForm = ({ amount }) => {
	const { cart, setCart } = useContext(CartContext)
	const { user } = useUser()
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);
	const [errormessage, setErrorMessage] = useState()


	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {			
			return;
		}
		const handleError = (error) => {
			setLoading(false)
			setErrorMessage(error.message)
		}
		
		createOrder();
		// Send an Email
		sendEmail();
		// Trigger form validation and wallet collection
		const { error: submitError } = await elements.submit();
		if (submitError) {
			handleError(submitError);
			return;
		}
		
		const res = await fetch('api/create-intent', {
			method: 'POST',
			body: JSON.stringify({
				amount: amount
			})
		})

		const clientSecret = await res.json()

		const result = await stripe.confirmPayment({
			clientSecret,
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/payment-confirm",
			},
		});

		if (result.error) {
			console.log(result.error.message);
		} else {

		}
	};
	const createOrder = () => {
		let productIds = [];
		cart.forEach(el => {
			productIds.push(el?.product?.id)
		})
		const data = {
			data: {
				email: user.primaryEmailAddress.emailAddress,
				username: user.fullName,
				amount,
				products: productIds
			}
		}
		OrderApi.createOrder(data).then((res) => {
			if (res) {
				cart.forEach(el => {
					CartApis.deleteCartItem(el?.id).then(result => {

					})
				})
			}
		})
	}
	const sendEmail = async () => {
		const res = await fetch('api/send-email', {
			method: 'POST',
			body: JSON.stringify({
				amount: amount,
				email: user.primaryEmailAddress.emailAddress,
				fullName: user.fullName
			})
		})
	}
	return (
		<form onSubmit={handleSubmit}>
			<div className='mx-32 md:mx-[320px] mt-12'><PaymentElement />
				<button className='w-full p-2 mt-4 text-white rounded-md bg-primary'>Submit</button>
			</div>

		</form>
	);
};

export default CheckoutForm;