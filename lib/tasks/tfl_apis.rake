require 'open-uri'

namespace :tfl_apis do

  desc "fetch tfl camera api and save data into camera table"
  
  task :cameras => :environment do
    url = "http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/jamcams-camera-list.xml"
    doc = Nokogiri::XML(open(url))
    Camera.delete_all
    doc.xpath("//syndicatedFeed/cameraList/camera").each do |camera|
      attributes = {
        available: camera.attribute("available").to_s,
        file: camera.xpath("file").text,
        lat: camera.xpath("lat").text,
        lng: camera.xpath("lng").text,
        postcode: camera.xpath("postCode").text,
        location: camera.xpath("location").text
      }
      Camera.create(attributes)
    end
  end

end
