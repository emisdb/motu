<?php

use yii\db\Migration;

/**
 * Class m201129_101453_mediafiles
 */
class m201129_101453_mediafiles extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
		$tableOptions = null;
		if ($this->db->driverName === 'mysql') {
			$tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
		}

			$this->createTable('mediafiles', [
				'id' => $this->primaryKey(),
				'filename' => $this->string(255),
				'path' => $this->string(255),
				'created_by' => $this->string(50),
				'created_at' => 'datetime NOT NULL DEFAULT  NOW()',
				'updated_at' => 'datetime NOT NULL DEFAULT  NOW()',

			], $tableOptions);
		$this->createTable('galleries', [
			'id' => $this->primaryKey(),
			'gallery_name' => $this->string(255),
			'gallery_type' => $this->integer(4)->notNull(),
			'media_id' => $this->integer()->notNull(),
			'provider_id' => $this->integer()->notNull(),
			'created_by' => $this->string(50),
			'created_at'       => 'datetime NOT NULL DEFAULT  NOW()',
			'updated_at'       => 'datetime NOT NULL DEFAULT  NOW()',

		], $tableOptions);
		$this->addForeignKey('galleries_ibfk_1',    'galleries', 'provider_id',    'provider', 'id', 'CASCADE', 'CASCADE');
		$this->addForeignKey('galleries_ibfk_2',    'galleries', 'media_id',    'mediafiles', 'id', 'CASCADE', 'CASCADE');

	}

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
		$this->dropTable('mediafiles');
		$this->dropTable('galleries');
	}

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m201129_101453_mediafiles cannot be reverted.\n";

        return false;
    }
    */
}
