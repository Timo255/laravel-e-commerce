<?php

namespace App\Models;

use App\Models\User;
use App\Models\Shipping;
use App\Models\Orderitem;
use Illuminate\Database\Eloquent\Model;

class Orderdetail extends Model
{
      protected $fillable = [
        'subtotal',
        'total',
        'delivery_status',
        'payment_status',
        'customerId',
        'user_id',
    ];

    public function orderItems(){
        return $this->hasMany(Orderitem::class);
    }

    public function shipping(){
        return $this->hasOne(Shipping::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
