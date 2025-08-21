<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    // use HasFactory, Notifiable;

    // $fillable, used to specify which atrribute are mass assignable
    // mass assignment it allowes to create or update multiple model attributes at once 
    // by default laravel protects against mass assignment by requring to define which attributes can be mass assigned 
   protected $fillable = [
      'user_id', 'title', 'excerpt', 'description', 'min_to_read'  
   ];

   // $casts property in laravel model is used to specify the datatype of certain attributes
   protected $casts = [
        'updated_at' => 'datetime',
        'created_at' => 'datetime'
   ];

   public function user(): BelongsTo
   {
     return $this->belongsTo(User::class);
   }
}
