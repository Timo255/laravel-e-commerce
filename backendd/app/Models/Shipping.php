<?php

namespace App\Models;

use App\Models\Orderdetail;
use App\Models\Shippingaddress;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    protected $fillable = [
        'email',
        'name',
        'phone',
        'tax_exempt',
        'orderdetail_id',
    ];

    public function orderDetail(){
        return $this->belongsTo(Orderdetail::class);
    }

    public function shippingaddress(){
        return $this->hasOne(Shippingaddress::class);
    }
}
