
import userModel from '../models/userModel.js'


// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const {userId, itemId, size, color, itemKey: reqItemKey} = req.body;
        const itemKey = reqItemKey || (color ? `${size}_${color}` : size);

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData || {};

        if (cartData[itemId]) {
            if (cartData[itemId][itemKey]) {
                cartData[itemId][itemKey] += 1
            }else {
                cartData[itemId][itemKey] = 1
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][itemKey] = 1; 
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success : true, message : "Added to cart"})

    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

//  Update user cart
const updateCart = async (req, res) => {
    try {
        const {userId, itemId, size, color, itemKey: reqItemKey, quantity} = req.body;
        const itemKey = reqItemKey || (color ? `${size}_${color}` : size);

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][itemKey] = quantity;

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success : true, message : "Cart updated successfully."})

    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

// Get user cart data
const getUserCart = async (req, res) => {
    try {

        const {userId} = req.body;

        const userData = await userModel.findById(userId);
        const cartData = await userData.cartData;

        res.json({success : true, cartData})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

export {addToCart, updateCart, getUserCart};