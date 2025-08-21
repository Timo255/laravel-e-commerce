<?php

namespace App\Models;

use App\Models\Shipping;
use Illuminate\Database\Eloquent\Model;

class Shippingaddress extends Model
{
      protected $fillable = [
        'city',
        'country',
        'line1',
        'line2',
        'postal_code',
        'state',
        'orderdetail_id',
    ];

    public function shipping(){
        return $this->belongsTo(Shipping::class);
    }
}
