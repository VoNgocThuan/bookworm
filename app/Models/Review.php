<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'review';

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    protected $appends = array('review_date_formatted');

    function getReviewDateFormattedAttribute()
    {
        return Carbon::parse($this->attributes['review_date'])->format('F j, Y');
    }
}
