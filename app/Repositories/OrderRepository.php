<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderRepository implements CrudInterface
{
    public function findById($id)
    {
        $orders = Order::find($id);
        return $orders;
    }
    public function getAll()
    {
        $orders = Order::get();
        return $orders;
    }
    public function create(Request $request)
    {
        $orders = new Order();
        $orders->user_id = $request->user_id;
        $orders->order_date = $request->order_date;
        $orders->order_amount = $request->order_amount;
        $orders->save();

        return $orders;
    }
    public function edit(Request $request, $id)
    {
    }
    public function delete($id)
    {
    }
}
