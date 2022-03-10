<?php

namespace App\Http\Controllers;

use App\Repositories\CartRepository;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public $cartRepositoty;

    public function __construct(CartRepository $cartRepositoty)
    {
        $this->cartRepositoty = $cartRepositoty;
    }

    public function cartList()
    {
        $cartList = $this->cartRepositoty->list();

        return $cartList;
    }

    public function totalCart()
    {
        $total = $this->cartRepositoty->total();

        return $total;
    }

    public function totalQuantity()
    {
        $totalQty = $this->cartRepositoty->quantity();

        return $totalQty;
    }

    public function addToCart(Request $request)
    {
        $addToCart = $this->cartRepositoty->add($request);

        return $addToCart;
    }

    public function getCartDetail(Request $request)
    {
        $cartDetails = $this->cartRepositoty->details($request);

        return $cartDetails;
    }

    public function updateCart(Request $request)
    {
        $updateCart = $this->cartRepositoty->update($request);

        return $updateCart;
    }

    public function updateCartIncrement(Request $request)
    {
        $increment = $this->cartRepositoty->qtyIncrement($request);

        return $increment;
    }

    public function updateCartDecrement(Request $request)
    {
        $decrement = $this->cartRepositoty->qtyDecrement($request);

        return $decrement;
    }

    public function removeCart(Request $request)
    {
        $removeCartItem = $this->cartRepositoty->remove($request);

        return $removeCartItem;
    }

    public function clearAllCart()
    {
        $clearCart = $this->cartRepositoty->clear();

        return $clearCart;
    }
}
