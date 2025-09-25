<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Pricelist extends Model
{
    use HasUuids;

    protected $guarded = ['id'];

    public function items(){
        return $this->hasMany(PricelistItem::class);
    }
}
