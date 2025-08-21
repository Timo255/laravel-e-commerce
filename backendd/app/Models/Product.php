<?php

namespace App\Models;

use App\Models\Variation;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function variations(){
        return $this->belongsToMany(Variation::class);
    }
}
