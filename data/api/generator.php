<?php


$arr = array();

$arr['id'] = 2015;

$arr['provider'] = [array('id' => 1075,
				'amount' => 876543,
				'date' => '2014-01-03'),
			array('id' => 1076,
				'amount' => 174543,
				'date' => '2013-12-07')];

$arr['recipient'] = [array('id' => 3112,
				'amount' => 123,
				'date' => '2010-03-21'),
			array('id' => 30113,
				'amount' => 34543,
				'date' => '2013-12-07'),
			array('id' => 30114,
				'amount' => 1543,
				'date' => '2012-12-07')];

$arr['name'] = 'This is an activity!';

$arr['date'] = '2014-01-27';

$arr['status'] = 'Implementation';

$arr['recipient_country'] = 'ZM';

$arr['sector'] = 'Food aid/Food security programmes';

echo json_encode($arr);
?>
