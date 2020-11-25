<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "constants".
 *
 * @property string $key
 * @property string $value
 */
class Constants extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'constants';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['key', 'value'], 'required'],
            [['key'], 'string', 'max' => 16],
            [['value'], 'string', 'max' => 64],
            [['key'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'key' => 'Key',
            'value' => 'Value',
        ];
    }
	public static function get($key){
    	$result = self::findOne($key);
    	if(is_null($result)) return $result;
    	return $result->getAttribute('value');
	}

}
