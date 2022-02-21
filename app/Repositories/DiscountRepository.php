<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountRepository implements CrudInterface
{
    public function getAll()
    {
        $discounts = Discount::all();
        return $discounts;
    }
    public function findById($id)
    {
        $discounts = Discount::find($id);
        return $discounts;
    }
    public function create(Request $request)
    {
    }
    public function edit(Request $request, $id)
    {
    }
    public function delete($id)
    {
    }
}
