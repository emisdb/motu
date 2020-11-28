<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "filter_providert".
 *
 * @property int $id
 * @property int $provider_id
 * @property int $filter_id
 *
 * @property Provider $provider
 * @property Filter $filter
 */
class FilterProvidert extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'filter_providert';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['provider_id', 'filter_id'], 'required'],
            [['provider_id', 'filter_id'], 'integer'],
            [['provider_id'], 'exist', 'skipOnError' => true, 'targetClass' => Provider::className(), 'targetAttribute' => ['provider_id' => 'id']],
            [['filter_id'], 'exist', 'skipOnError' => true, 'targetClass' => Filter::className(), 'targetAttribute' => ['filter_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'provider_id' => 'Provider ID',
            'filter_id' => 'Filter ID',
        ];
    }

    /**
     * Gets query for [[Provider]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProvider()
    {
        return $this->hasOne(Provider::className(), ['id' => 'provider_id']);
    }

    /**
     * Gets query for [[Filter]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFilter()
    {
        return $this->hasOne(Filter::className(), ['id' => 'filter_id']);
    }
}
