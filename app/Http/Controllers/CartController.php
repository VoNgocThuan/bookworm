<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Darryldecode\Cart\Facades\CartFacade;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function cartList()
    {
        $cartItems = CartFacade::getContent();

        return $cartItems;
    }

    public function totalCart()
    {
        $cartTotal = CartFacade::getTotal();

        return $cartTotal;
    }

    public function totalQuantity()
    {
        $cartTotalQuantity = CartFacade::getTotalQuantity();

        return $cartTotalQuantity;
    }

    public function addToCart(Request $request)
    {
        if($request->discount_price == null) {
            $book_price = $request->book_price;
        } else {
            $book_price = $request->discount_price;
        }
        $add = CartFacade::add([
            'id' => $request->id,
            'name' => $request->book_title,
            'price' => $book_price,
            'quantity' => $request->quantity,
            'attributes' => array(
                'image' => $request->book_cover_photo,
                'old_price' => $request->book_price,
                'author_name' => $request->author_name
            )
        ]);

        if ($add) {
            return "Thêm thành công vào giỏ hàng";
        }
    }

    public function getCartDetail(Request $request)
    {
        return CartFacade::get($request->id);
    }

    public function updateCart(Request $request)
    {
        $update = CartFacade::update($request->id, [
            'quantity' => [
                'relative' => false,
                'value' => $request->quantity
            ],
        ]);
        if ($update) {
            return "Cập nhật số lượng thành công";
        }
    }

    public function updateCartIncrement(Request $request)
    {
        $increment = CartFacade::update($request->id, [
            'quantity' => [
                'relative' => false,
                'value' => $request->quantity + 1
            ],
        ]);
        if ($increment) {
            return "Tăng số lượng thành công";
        }
    }

    public function updateCartDecrement(Request $request)
    {
        $decrement = CartFacade::update($request->id, [
            'quantity' => [
                'relative' => false,
                'value' => $request->quantity - 1
            ],
        ]);
        if ($decrement) {
            return "Giảm số lượng thành công";
        }
    }

    public function removeCart(Request $request)
    {
        $remove = CartFacade::remove($request->id);
        
        if ($remove) {
            return "Xóa thành công";
        }
    }

    public function clearAllCart()
    {
        $clear = CartFacade::clear();

        if ($clear) {
            return "Xóa thành công";
        }
    }
}
