<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class PricelistItem extends Model
{
    use HasUuids;

    protected $guarded = ['id'];

    public function pricelist(){
        return $this->belongsTo(Pricelist::class);
    }
}
