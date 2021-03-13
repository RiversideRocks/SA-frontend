/*

Requires:

jquery
js-SHA256

*/

function send(){
$.get("https://ipapi.co/ip/", function(data, status){
    console.log("Status: Was IP address collection ok? "+status)
    var hash = sha256(data)
    $.get(`https://ipapi.co/${data}/country/`, function(data, status){
        console.log("Status: Was country collection ok? "+status)
        var country = data
        var ogdate = new Date().valueOf();
        var unrounded_epoch = ogdate / 1000;
        var epoch = Math.round(unrounded_epoch)
        $.post("https://riverside.rocks/apis/inbound.php?d="+window.location.hostname, {epoch: epoch, country: country, token: hash});
    })
})
}
var interval = setInterval(send, 5000); 
