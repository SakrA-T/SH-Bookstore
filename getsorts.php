<?php

$link=mysqli_connect("localhost", "root", "937461995", "bookstore") or die("{\"code\":-1,\"msg\":\"连接数据库时出现错误！请联系系统管理员进行修复！\r\nerror code:".mysqli_connect_error()."\"}");


$query = "SELECT author,press,bdate,sorts FROM booksale";
$result = mysqli_query($link, $query);
$rows = mysqli_num_rows($result);

$data = "[";
for ($i = 1; $i <= $rows; $i++) {
    $row = mysqli_fetch_object($result);
    $data .= "{\"author\":\"" . $row->author . "\",\"press\":\"" . $row->press . "\",\"date\":" . $row->bdate . ",\"sorts\":\"" . $row->sorts . "\"}";
    if ($i != $rows) {
        $data .= ',';
    }
}

$data .= "]";

mysqli_close($link);
echo $data;
