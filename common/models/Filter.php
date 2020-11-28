<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "filter".
 *
 * @property int $id
 * @property int $category_id
 * @property string $name
 * @property string $title
 *
 * @property Category $category
 * @property FilterProvider[] $filterProviders
 * @property FilterProvidert[] $filterProviderts
 */
class Filter extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'filter';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['category_id', 'name', 'title'], 'required'],
            [['category_id'], 'integer'],
            [['name'], 'string', 'max' => 16],
            [['title'], 'string', 'max' => 32],
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
            'name' => 'Name',
            'title' => 'Title',
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
        return $this->hasMany(FilterProvider::className(), ['filter_id' => 'id']);
    }

    /**
     * Gets query for [[FilterProviderts]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFilterProviderts()
    {
        return $this->hasMany(FilterProvidert::className(), ['filter_id' => 'id']);
    }
}
