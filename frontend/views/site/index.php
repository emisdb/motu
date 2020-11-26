<?php
use yii\helpers\Html;

/* @var $this yii\web\View */

//$this->title = 'My Yii Application';

?>
    <div class="central-map maxmapsis growUp" id="map">
    </div>
<?php
    $this->registerJs("const center_coors = ".json_encode($center),$this::POS_HEAD);
    $this->registerJs("const show_points = ".json_encode($result),$this::POS_HEAD);
    $this->registerJs("const show_recommend = ".json_encode($recommendations),$this::POS_HEAD);
    $this->registerJsFile('/js/motu/app.js',[$this::POS_END]);
	$this->registerJsFile('/js/motu/modal.js',[$this::POS_END]);
	$this->registerJsFile('/js/motu/index.js',[$this::POS_END]);
?>

