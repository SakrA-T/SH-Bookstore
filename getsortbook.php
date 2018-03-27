<?php
// require "common.php";
$author = $_POST['author'];
$page = $_POST['page'];
$sortstr = $_POST['sortstr'];
$press = $_POST['press'];
$date = $_POST['date'];

$link=mysqli_connect("localhost", "root", "937461995", "bookstore") or die("{\"code\":-1,\"msg\":\"连接数据库时出现错误！请联系系统管理员进行修复！\r\nerror code:".mysqli_connect_error()."\"}");


$query ="SELECT * from booksale where "
	   . ($sortstr!='' ? "sorts LIKE '%".$sortstr."%' " : "")
	   . (($sortstr!='')&&($author!='')?"and" : "")
       . ($author!='' ? "(author LIKE '%".$author."%') " : "")
	   . (($press!='')&&(($sortstr!='')||($author!=''))?"and" : "")
       . ($press!='' ? " (press='".$press."') " : "")
       . (($date!='')&&(($press!='')||($sortstr!='')||($author!=''))?"and" : "")
       . ($date!='' ? " (bdate=".$date.")" : "")
 	   . " LIMIT 8";

// print_r($query);
$result = mysqli_query($link, $query);
$rows = mysqli_num_rows($result);

$data = "[";
for ($i = 1; $i <= $rows; $i++) {
    $row = mysqli_fetch_object($result);
    $page = ceil($i/10);
    $data .= "{\"bookid\":" . $row->bookid . ",\"page\":" . $page . ",\"seller\":\"" . $row->seller . "\",\"name\":\"" . $row->bookname . "\",\"author\":\"" . $row->author . "\",\"press\":\"" . $row->press . "\",\"date\":" . $row->bdate . ",\"sorts\":\"" . $row->sorts . "\",\"oldprice\":" . $row->oldprice . ",\"pin\":" . $row->pin . ",\"newprice\":" . $row->newprice . ",\"images\":\"" . $row->images . "\"}";
    if ($i != $rows) {
        $data .= ',';
    }
}

$data .= "]";

mysqli_close($link);
echo $data;
