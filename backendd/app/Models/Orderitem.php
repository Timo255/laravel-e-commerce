<?php

namespace App\Models;

use App\Models\Orderdetail;
use Illuminate\Database\Eloquent\Model;

class Orderitem extends Model
{
      protected $fillable = [
        'productName',
        'product_Id',
        'variationName',
        'imgUrl',
        'quantity',
        'price',
        'orderdetail_id',
    ];

    public function orderDetail(){
        return $this->belongsTo(Orderdetail::class);
    }
}
