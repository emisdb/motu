<?php

namespace common\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\modules\book\models\Providers;

/**
 * ProvidersSearch represents the model behind the search form of `app\modules\book\models\Providers`.
 */
class ProvidersSearch extends Providers
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'category_id'], 'integer'],
            [['brand_name', 'brand_name_en', 'description', 'object_type', 'short_description', 'address', 'latitude', 'longitude', 'email', 'phone', 'web_url', 'created_at', 'updated_at'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Providers::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'category_id' => $this->category_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ]);

        $query->andFilterWhere(['like', 'brand_name', $this->brand_name])
            ->andFilterWhere(['like', 'brand_name_en', $this->brand_name_en])
            ->andFilterWhere(['like', 'description', $this->description])
            ->andFilterWhere(['like', 'object_type', $this->object_type])
            ->andFilterWhere(['like', 'short_description', $this->short_description])
            ->andFilterWhere(['like', 'address', $this->address])
            ->andFilterWhere(['like', 'latitude', $this->latitude])
            ->andFilterWhere(['like', 'longitude', $this->longitude])
            ->andFilterWhere(['like', 'email', $this->email])
            ->andFilterWhere(['like', 'phone', $this->phone])
            ->andFilterWhere(['like', 'web_url', $this->web_url]);

        return $dataProvider;
    }
}
