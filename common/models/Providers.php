<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "providers".
 *
 * @property int $id
 * @property int $category_id
 * @property string $brand_name
 * @property string $brand_name_en
 * @property string|null $description
 * @property string|null $description_en
 * @property string $object_type
 * @property string $short_description
 * @property string $address
 * @property string $area
 * @property string|null $latitude
 * @property string|null $longitude
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $web_url
 * @property string|null $created_at
 * @property string|null $updated_at
 *
 * @property Category $category
 * @property FilterProvider[] $filterProviders
 */
class Providers extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'providers';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['category_id', 'brand_name', 'brand_name_en', 'object_type', 'short_description', 'address'], 'required'],
            [['category_id'], 'integer'],
            [['description','description_en', 'address'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['brand_name', 'brand_name_en', 'email'], 'string', 'max' => 50],
            [['object_type', 'short_description', 'area'], 'string', 'max' => 32],
            [['latitude', 'longitude'], 'string', 'max' => 30],
            [['phone'], 'string', 'max' => 50],
            [['web_url'], 'string', 'max' => 250],
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
			'description_en' => 'Description En',
			'object_type' => 'Object Type',
            'short_description' => 'Short Description',
            'address' => 'Address',
            'latitude' => 'Latitude',
            'longitude' => 'Longitude',
			'email' => 'Email',
			'area' => 'Area',
			'phone' => 'Phone',
            'web_url' => 'Web Url',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
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

    /**
     * Gets query for [[FilterProviders]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFilterProviders()
    {
        return $this->hasMany(FilterProvider::className(), ['provider_id' => 'id']);
    }
}
