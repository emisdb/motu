<?php
use yii\helpers\Html;

/* @var $this yii\web\View */

//$this->title = 'My Yii Application';

?>

    <div class="central-map maxmapsis growUp" id="map">
    </div>
<?php
    $this->registerJsFile('/js/motu/app.js',[$this::POS_END]);
	$this->registerJsFile('/js/motu/modal.js',[$this::POS_END]);
	$this->registerJsFile('/js/motu/index.js',[$this::POS_END]);
?>

