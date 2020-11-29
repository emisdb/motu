<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "galleries".
 *
 * @property int $id
 * @property string|null $gallery_name
 * @property int $gallery_type
 * @property int $media_id
 * @property int $provider_id
 * @property string|null $created_by
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Provider $provider
 * @property Mediafiles $media
 */
class Galleries extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'galleries';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['gallery_type', 'media_id', 'provider_id'], 'required'],
            [['gallery_type', 'media_id', 'provider_id'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['gallery_name'], 'string', 'max' => 255],
            [['created_by'], 'string', 'max' => 50],
            [['provider_id'], 'exist', 'skipOnError' => true, 'targetClass' => Provider::className(), 'targetAttribute' => ['provider_id' => 'id']],
            [['media_id'], 'exist', 'skipOnError' => true, 'targetClass' => Mediafiles::className(), 'targetAttribute' => ['media_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'gallery_name' => 'Gallery Name',
            'gallery_type' => 'Gallery Type',
            'media_id' => 'Media ID',
            'provider_id' => 'Provider ID',
            'created_by' => 'Created By',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
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
     * Gets query for [[Media]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMedia()
    {
        return $this->hasOne(Mediafiles::className(), ['id' => 'media_id']);
    }
}
