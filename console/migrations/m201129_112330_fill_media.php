<?php

use yii\db\Migration;

/**
 * Class m201129_112330_fill_media
 */
class m201129_112330_fill_media extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
		$this->insert('mediafiles', [
			'id'      => 1,
			'filename'      => 'hermitage.jpeg',
		]);
		$this->insert('mediafiles', [
			'id'      => 2,
			'filename'      => 'hrc_logo.jpeg',
		]);
		$this->insert('mediafiles', [
			'id'      => 3,
			'filename'      => 'stisaac.jpeg',
		]);
		$this->insert('galleries', [
			'gallery_type'      => 1,
			'media_id'      	=> 1,
			'provider_id'      => 3,
			'gallery_name'      => 'hermitage',
		]);
		$this->insert('galleries', [
			'gallery_type'      => 1,
			'media_id'      	=> 2,
			'provider_id'      => 5,
			'gallery_name'      => 'stisaac',
		]);

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m201129_112330_fill_media cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m201129_112330_fill_media cannot be reverted.\n";

        return false;
    }
    */
}
