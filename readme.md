Campground Hotspot Auto Signon
=======================

 Right now we are staying for a week at a campground, and the Wifi here requires you to re-authenticate every hour regardless of activity. It got really annoying.

 ```
 $ npm install
 $ node src/index.js --recovery-url "http://campgroundhotspot/Login?sitenumber=1234&name=scott"
 ```

 Magic! Good thing this campground didn't require I have a certain POST body, and that it blocked HTTPS instead of just allowing HTTPS and spoofing HTTP so I have to specify spoofing detection via command arguments. 

 I think I received my first code-related kiss when I installed this on my wife's laptop. :-)