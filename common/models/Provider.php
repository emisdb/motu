<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "provider".
 *
 * @property int $id
 * @property int $category_id
 * @property string $brand_name
 * @property string $brand_name_en
 * @property string|null $description
 * @property string $object_type
 * @property string $short_description
 * @property string $address
 * @property string|null $latitude
 * @property string|null $longitude
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $web_url
 * @property string|null $created_at
 * @property string|null $updated_at
 * @property string|null $description_en
 * @property string|null $area
 * @property int $rating
 * @property int $discount
 * @property int $vist_term
 * @property float $average_price
 * @property string|null $from_operation_hour
 * @property string|null $to_operation_hour
 *
 * @property Category $category
 */
class Provider extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'provider';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['category_id', 'brand_name', 'brand_name_en', 'object_type', 'short_description', 'address'], 'required'],
            [['category_id', 'rating', 'discount', 'vist_term'], 'integer'],
            [['description', 'address', 'description_en'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['average_price'], 'number'],
            [['brand_name', 'brand_name_en', 'email', 'phone'], 'string', 'max' => 50],
            [['object_type', 'short_description', 'area'], 'string', 'max' => 32],
            [['latitude', 'longitude'], 'string', 'max' => 30],
            [['web_url'], 'string', 'max' => 250],
            [['from_operation_hour', 'to_operation_hour'], 'string', 'max' => 5],
            [['category_id'], 'exist', 'skipOnError' => true, 'targetClass' => Category::className(), 'targetAttribute' => ['category_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'category_id' => 'Category ID',
            'brand_name' => 'Brand Name',
            'brand_name_en' => 'Brand Name En',
            'description' => 'Description',
            'object_type' => 'Object Type',
            'short_description' => 'Short Description',
            'address' => 'Address',
            'latitude' => 'Latitude',
            'longitude' => 'Longitude',
            'email' => 'Email',
            'phone' => 'Phone',
            'web_url' => 'Web Url',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
            'description_en' => 'Description En',
            'area' => 'Area',
            'rating' => 'Rating',
            'discount' => 'Discount',
            'vist_term' => 'Vist Term',
            'average_price' => 'Average Price',
            'from_operation_hour' => 'From Operation Hour',
            'to_operation_hour' => 'To Operation Hour',
        ];
    }

    /**
     * Gets query for [[Category]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCategory()
    {
        return $this->hasOne(Category::className(), ['id' => 'category_id']);
    }
	public static function recommend(){
    	$arr=[];
    	for($i=0; $i<25; $i++){
    		if($i%2){
				$arr[] = ['picture' => 'images/tmp_pics/hermitage.jpeg', 'text' =>'Эрмитаж'];
			}else{
				$arr[] = ['picture' => 'images/tmp_pics/stisaac.jpeg', 'text' =>'Исаакиевскиий собор'];
			}
		}
    	return $arr;
	}
		public static function filterByCoors($topleft,$bottomright){
		return static::find()
			->select('brand_name_en,category_id,latitude,longitude')
			->where(['>=', 'latitude', $bottomright[1]])
			->andWhere(['<=', 'latitude', $topleft[1]])
			->andWhere(['>=', 'longitude', $topleft[0]])
			->andWhere(['<=', 'longitude', $bottomright[0]])
			->asArray(true)
			->all();
	}

}
