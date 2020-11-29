<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "mediafiles".
 *
 * @property int $id
 * @property string|null $filename
 * @property string|null $path
 * @property string|null $created_by
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Galleries[] $galleries
 */
class Mediafiles extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'mediafiles';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['created_at', 'updated_at'], 'safe'],
            [['filename', 'path'], 'string', 'max' => 255],
            [['created_by'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'filename' => 'Filename',
            'path' => 'Path',
            'created_by' => 'Created By',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * Gets query for [[Galleries]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGalleries()
    {
        return $this->hasMany(Galleries::className(), ['media_id' => 'id']);
    }
}
