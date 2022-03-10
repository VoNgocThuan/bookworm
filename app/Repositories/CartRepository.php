<?php

namespace App\Repositories;

use Darryldecode\Cart\Facades\CartFacade;
use Illuminate\Http\Request;

class CartRepository
{
    public function list()
    {
        $cartItems = CartFacade::getContent();

        return $cartItems;
    }

    public function details(Request $request)
    {
        return CartFacade::get($request->id);
    }

    public function total()
    {
        $cartTotal = CartFacade::getTotal();

        return $cartTotal;
    }

    public function quantity()
    {
        $cartTotalQuantity = CartFacade::getTotalQuantity();

        return $cartTotalQuantity;
    }

    public function add(Request $request)
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

    public function update(Request $request)
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

    public function qtyIncrement(Request $request)
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

    public function qtyDecrement(Request $request)
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

    public function remove(Request $request)
    {
        $remove = CartFacade::remove($request->id);
        
        if ($remove) {
            return "Xóa thành công";
        }
    }

    public function clear()
    {
        $clear = CartFacade::clear();

        if ($clear) {
            return "Xóa thành công";
        }
    }
}
