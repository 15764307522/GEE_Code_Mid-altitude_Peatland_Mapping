///////////////////////////////////////////////////////////////////////////////////////////
//////////////     Mid-altitude Peatland Mapping     //////////////
///////////////////////////////////////////////////////////////////////////////////////////
Map.centerObject(roi,7);  
Map.addLayer(roi, [],'roi');

////////////////////////////////////////////////////////////////////////////////////
///////////     Sentinel-2 Imagery Collection and Preprocessing     ///////////
///////////////////////////////////////////////////////////////////////////////////

//Function to mask the clouds in Sentinel-2
function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return image.updateMask(mask).divide(10000);
}

//Generation of May image dataset
var col_may = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                                .filter(ee.Filter.calendarRange(2019,2021,'year'))
                                .filter(ee.Filter.calendarRange(5,5,'month'))
                                .map(maskS2clouds)
                                .filterBounds(roi);
//Generation of June image dataset
var col_june = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                                .filter(ee.Filter.calendarRange(2019,2021,'year'))
                                .filter(ee.Filter.calendarRange(6,6,'month'))
                                .map(maskS2clouds)
                                .filterBounds(roi);
//Generation of July image dataset
var col_july = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                                .filter(ee.Filter.calendarRange(2019,2021,'year'))
                                .filter(ee.Filter.calendarRange(7,7,'month'))
                                .map(maskS2clouds)
                                .filterBounds(roi);
//Generation of August image dataset
var col_august = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                                .filter(ee.Filter.calendarRange(2019,2021,'year'))
                                .filter(ee.Filter.calendarRange(8,8,'month'))
                                .map(maskS2clouds)
                                .filterBounds(roi);
//Generation of September image dataset
var col_september = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                                .filter(ee.Filter.calendarRange(2019,2021,'year'))
                                .filter(ee.Filter.calendarRange(9,9,'month'))
                                .map(maskS2clouds)
                                .filterBounds(roi);
//Generation of October image dataset
var col_october = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                                .filter(ee.Filter.calendarRange(2019,2021,'year'))
                                .filter(ee.Filter.calendarRange(10,10,'month'))
                                .map(maskS2clouds)
                                .filterBounds(roi);

// Synthetic Monthly Median Image
var img_may = col_may.median().unmask(999).clip(roi);
var img_june = col_june.median().unmask(999).clip(roi);
var img_july = col_july.median().unmask(999).clip(roi);
var img_august = col_august.median().unmask(999).clip(roi);
var img_september = col_september.median().unmask(999).clip(roi);
var img_october = col_october.median().unmask(999).clip(roi);

// Resample all bands of the May image to 10-meter resolution
var may_b1 = img_may.select('B1');
var may_b2 = img_may.select('B2').rename('may_B2');
var may_b3 = img_may.select('B3').rename('may_B3');
var may_b4 = img_may.select('B4').rename('may_B4');
var may_b5 = img_may.select('B5');
var may_b6 = img_may.select('B6');
var may_b7 = img_may.select('B7');
var may_b8 = img_may.select('B8').rename('may_B8');
var may_b8a = img_may.select('B8A');
var may_b9 = img_may.select('B9');
var may_b11 = img_may.select('B11');
var may_b12 = img_may.select('B12');

var resampled_may_b1 = may_b1.resample('bilinear')
                           .reproject({
                           crs: may_b1.projection(),
                           scale:10
                           }).rename('may_B1');
var resampled_may_b5 = may_b5.resample('bilinear')
                           .reproject({
                           crs: may_b5.projection(),
                           scale:10
                           }).rename('may_B5');
var resampled_may_b6 = may_b6.resample('bilinear')
                           .reproject({
                           crs: may_b6.projection(),
                           scale:10
                           }).rename('may_B6');
var resampled_may_b7 = may_b7.resample('bilinear')
                           .reproject({
                           crs: may_b7.projection(),
                           scale:10
                           }).rename('may_B7');
var resampled_may_b8a = may_b8a.resample('bilinear')
                           .reproject({
                           crs: may_b8a.projection(),
                           scale:10
                           }).rename('may_B8A');
var resampled_may_b9 = may_b9.resample('bilinear')
                           .reproject({
                           crs: may_b9.projection(),
                           scale:10
                           }).rename('may_B9');
var resampled_may_b11 = may_b11.resample('bilinear')
                           .reproject({
                           crs: may_b11.projection(),
                           scale:10
                           }).rename('may_B11');
var resampled_may_b12 = may_b12.resample('bilinear')
                           .reproject({
                           crs: may_b12.projection(),
                           scale:10
                           }).rename('may_B12');

var s2img_may = ee.Image([resampled_may_b1,may_b2,may_b3,may_b4,resampled_may_b5,resampled_may_b6,resampled_may_b7,may_b8,resampled_may_b8a,resampled_may_b9,resampled_may_b11,resampled_may_b12]);
// print(s2img_may,'s2img_may');

// Resample all bands of the June image to 10-meter resolution
var june_b1 = img_june.select('B1');
var june_b2 = img_june.select('B2').rename('june_B2');
var june_b3 = img_june.select('B3').rename('june_B3');
var june_b4 = img_june.select('B4').rename('june_B4');
var june_b5 = img_june.select('B5');
var june_b6 = img_june.select('B6');
var june_b7 = img_june.select('B7');
var june_b8 = img_june.select('B8').rename('june_B8');
var june_b8a = img_june.select('B8A');
var june_b9 = img_june.select('B9');
var june_b11 = img_june.select('B11');
var june_b12 = img_june.select('B12');

var resampled_june_b1 = june_b1.resample('bilinear')
                           .reproject({
                           crs: june_b1.projection(),
                           scale:10
                           }).rename('june_B1');
var resampled_june_b5 = june_b5.resample('bilinear')
                           .reproject({
                           crs: june_b5.projection(),
                           scale:10
                           }).rename('june_B5');
var resampled_june_b6 = june_b6.resample('bilinear')
                           .reproject({
                           crs: june_b6.projection(),
                           scale:10
                           }).rename('june_B6');
var resampled_june_b7 = june_b7.resample('bilinear')
                           .reproject({
                           crs: june_b7.projection(),
                           scale:10
                           }).rename('june_B7');
var resampled_june_b8a = june_b8a.resample('bilinear')
                           .reproject({
                           crs: june_b8a.projection(),
                           scale:10
                           }).rename('june_B8A');
var resampled_june_b9 = june_b9.resample('bilinear')
                           .reproject({
                           crs: june_b9.projection(),
                           cale:10
                           }).rename('june_B9');
var resampled_june_b11 = june_b11.resample('bilinear')
                           .reproject({
                           crs: june_b11.projection(),
                           scale:10
                           }).rename('june_B11');
var resampled_june_b12 = june_b12.resample('bilinear')
                           .reproject({
                           crs: june_b12.projection(),
                           scale:10
                           }).rename('june_B12');
var s2img_june = ee.Image([resampled_june_b1,june_b2,june_b3,june_b4,resampled_june_b5,resampled_june_b6,resampled_june_b7,june_b8,resampled_june_b8a,resampled_june_b9,resampled_june_b11,resampled_june_b12]);
// print(s2img_june,'s2img_june');

// Resample all bands of the July image to 10-meter resolution
var july_b1 = img_july.select('B1');
var july_b2 = img_july.select('B2').rename('july_B2');
var july_b3 = img_july.select('B3').rename('july_B3');
var july_b4 = img_july.select('B4').rename('july_B4');
var july_b5 = img_july.select('B5');
var july_b6 = img_july.select('B6');
var july_b7 = img_july.select('B7');
var july_b8 = img_july.select('B8').rename('july_B8');
var july_b8a = img_july.select('B8A');
var july_b9 = img_july.select('B9');
var july_b11 = img_july.select('B11');
var july_b12 = img_july.select('B12');

var resampled_july_b1 = july_b1.resample('bilinear')
                           .reproject({
                           crs: july_b1.projection(),
                           scale:10
                           }).rename('july_B1');
var resampled_july_b5 = july_b5.resample('bilinear')
                           .reproject({
                           crs: july_b5.projection(),
                           scale:10
                           }).rename('july_B5');
var resampled_july_b6 = july_b6.resample('bilinear')
                           .reproject({
                           crs: july_b6.projection(),
                           scale:10
                           }).rename('july_B6');
var resampled_july_b7 = july_b7.resample('bilinear')
                           .reproject({
                           crs: july_b7.projection(),
                           scale:10
                           }).rename('july_B7');
var resampled_july_b8a = july_b8a.resample('bilinear')
                           .reproject({
                           crs: july_b8a.projection(),
                           scale:10
                           }).rename('july_B8A');
var resampled_july_b9 = july_b9.resample('bilinear')
                           .reproject({
                           crs: july_b9.projection(),
                           scale:10
                           }).rename('july_B9');
var resampled_july_b11 = july_b11.resample('bilinear')
                           .reproject({
                           crs: july_b11.projection(),
                           scale:10
                           }).rename('july_B11');
var resampled_july_b12 = july_b12.resample('bilinear')
                           .reproject({
                           crs: july_b12.projection(),
                           scale:10
                           }).rename('july_B12');
var s2img_july = ee.Image([resampled_july_b1,july_b2,july_b3,july_b4,resampled_july_b5,resampled_july_b6,resampled_july_b7,july_b8,resampled_july_b8a,resampled_july_b9,resampled_july_b11,resampled_july_b12]);
// print(s2img_july,'s2img_july');

// Resample all bands of the August image to 10-meter resolution
var august_b1 = img_august.select('B1');
var august_b2 = img_august.select('B2').rename('august_B2');
var august_b3 = img_august.select('B3').rename('august_B3');
var august_b4 = img_august.select('B4').rename('august_B4');
var august_b5 = img_august.select('B5');
var august_b6 = img_august.select('B6');
var august_b7 = img_august.select('B7');
var august_b8 = img_august.select('B8').rename('august_B8');
var august_b8a = img_august.select('B8A');
var august_b9 = img_august.select('B9');
var august_b11 = img_august.select('B11');
var august_b12 = img_august.select('B12');

var resampled_august_b1 = august_b1.resample('bilinear')
                           .reproject({
                           crs: august_b1.projection(),
                           scale:10
                           }).rename('august_B1');
var resampled_august_b5 = august_b5.resample('bilinear')
                           .reproject({
                           crs: august_b5.projection(),
                           scale:10
                           }).rename('august_B5');
var resampled_august_b6 = august_b6.resample('bilinear')
                           .reproject({
                           crs: august_b6.projection(),
                           scale:10
                           }).rename('august_B6');
var resampled_august_b7 = august_b7.resample('bilinear')
                           .reproject({
                           crs: august_b7.projection(),
                           scale:10
                           }).rename('august_B7');
var resampled_august_b8a = august_b8a.resample('bilinear')
                           .reproject({
                           crs: august_b8a.projection(),
                           scale:10
                           }).rename('august_B8A');
var resampled_august_b9 = august_b9.resample('bilinear')
                           .reproject({
                           crs: august_b9.projection(),
                           scale:10
                           }).rename('august_B9');
var resampled_august_b11 = august_b11.resample('bilinear')
                           .reproject({
                           crs: august_b11.projection(),
                           scale:10
                           }).rename('august_B11');
var resampled_august_b12 = august_b12.resample('bilinear')
                           .reproject({
                           crs: august_b12.projection(),
                           scale:10
                           }).rename('august_B12');
var s2img_august = ee.Image([resampled_august_b1,august_b2,august_b3,august_b4,resampled_august_b5,resampled_august_b6,resampled_august_b7,august_b8,resampled_august_b8a,resampled_august_b9,resampled_august_b11,resampled_august_b12]);
// print(s2img_august,'s2img_august');

// Resample all bands of the September image to 10-meter resolution
var september_b1 = img_september.select('B1');
var september_b2 = img_september.select('B2').rename('september_B2');
var september_b3 = img_september.select('B3').rename('september_B3');
var september_b4 = img_september.select('B4').rename('september_B4');
var september_b5 = img_september.select('B5');
var september_b6 = img_september.select('B6');
var september_b7 = img_september.select('B7');
var september_b8 = img_september.select('B8').rename('september_B8');
var september_b8a = img_september.select('B8A');
var september_b9 = img_september.select('B9');
var september_b11 = img_september.select('B11');
var september_b12 = img_september.select('B12');

var resampled_september_b1 = september_b1.resample('bilinear')
                           .reproject({
                           crs: september_b1.projection(),
                           scale:10
                           }).rename('september_B1');
var resampled_september_b5 = september_b5.resample('bilinear')
                           .reproject({
                           crs: september_b5.projection(),
                           scale:10
                           }).rename('september_B5');
var resampled_september_b6 = september_b6.resample('bilinear')
                           .reproject({
                           crs: september_b6.projection(),
                           scale:10
                           }).rename('september_B6');
var resampled_september_b7 = september_b7.resample('bilinear')
                           .reproject({
                           crs: september_b7.projection(),
                           scale:10
                           }).rename('september_B7');
var resampled_september_b8a = september_b8a.resample('bilinear')
                           .reproject({
                           crs: september_b8a.projection(),
                           scale:10
                           }).rename('september_B8A');
var resampled_september_b9 = september_b9.resample('bilinear')
                           .reproject({
                           crs: september_b9.projection(),
                           scale:10
                           }).rename('september_B9');
var resampled_september_b11 = september_b11.resample('bilinear')
                           .reproject({
                           crs: september_b11.projection(),
                           scale:10
                           }).rename('september_B11');
var resampled_september_b12 = september_b12.resample('bilinear')
                           .reproject({
                           crs: september_b12.projection(),
                           scale:10
                           }).rename('september_B12');
var s2img_september = ee.Image([resampled_september_b1,september_b2,september_b3,september_b4,resampled_september_b5,resampled_september_b6,resampled_september_b7,september_b8,resampled_september_b8a,resampled_september_b9,resampled_september_b11,resampled_september_b12]);
// print(s2img_september,'s2img_september');

// Resample all bands of the September image to 10-meter resolution
var october_b1 = img_october.select('B1');
var october_b2 = img_october.select('B2').rename('october_B2');
var october_b3 = img_october.select('B3').rename('october_B3');
var october_b4 = img_october.select('B4').rename('october_B4');
var october_b5 = img_october.select('B5');
var october_b6 = img_october.select('B6');
var october_b7 = img_october.select('B7');
var october_b8 = img_october.select('B8').rename('october_B8');
var october_b8a = img_october.select('B8A');
var october_b9 = img_october.select('B9');
var october_b11 = img_october.select('B11');
var october_b12 = img_october.select('B12');

var resampled_october_b1 = october_b1.resample('bilinear')
                           .reproject({
                           crs: october_b1.projection(),
                           scale:10
                           }).rename('october_B1');
var resampled_october_b5 = october_b5.resample('bilinear')
                           .reproject({
                           crs: october_b5.projection(),
                           scale:10
                           }).rename('october_B5');
var resampled_october_b6 = october_b6.resample('bilinear')
                           .reproject({
                           crs: october_b6.projection(),
                           scale:10
                           }).rename('october_B6');
var resampled_october_b7 = october_b7.resample('bilinear')
                           .reproject({
                           crs: october_b7.projection(),
                           scale:10
                           }).rename('october_B7');
var resampled_october_b8a = october_b8a.resample('bilinear')
                           .reproject({
                           crs: october_b8a.projection(),
                           scale:10
                           }).rename('october_B8A');
var resampled_october_b9 = october_b9.resample('bilinear')
                           .reproject({
                           crs: october_b9.projection(),
                           scale:10
                           }).rename('october_B9');
var resampled_october_b11 = october_b11.resample('bilinear')
                           .reproject({
                           crs: october_b11.projection(),
                           scale:10
                           }).rename('october_B11');
var resampled_october_b12 = october_b12.resample('bilinear')
                           .reproject({
                           crs: october_b12.projection(),
                           scale:10
                           }).rename('october_B12');
var s2img_october = ee.Image([resampled_october_b1,october_b2,october_b3,october_b4,resampled_october_b5,resampled_october_b6,resampled_october_b7,october_b8,resampled_october_b8a,resampled_october_b9,resampled_october_b11,resampled_october_b12]);
// print(s2img_october,'s2img_october');

// Remote sensing index
var spectral = require("users/dmlmont/spectral:spectral");

var parameter_may = {
    "A": s2img_may.select("may_B1"),
    "B": s2img_may.select("may_B2"),
    "G": s2img_may.select("may_B3"),
    "R": s2img_may.select("may_B4"),
    "RE1": s2img_may.select("may_B5"),
    "RE2": s2img_may.select("may_B6"),
    "RE3": s2img_may.select("may_B7"),
    "N": s2img_may.select("may_B8"),
    "N2": s2img_may.select("may_B8A"),
    "S1": s2img_may.select("may_B11"),
    "S2": s2img_may.select("may_B12"),
    "L":0.5,
    "g":2.5,
    "C1":6,
    "C2":7.5,
    "gamma":7.5,
    "alpha":7.5,
    "omega":7.5
}
var parameter_june = {
    "A": s2img_june.select("june_B1"),
    "B": s2img_june.select("june_B2"),
    "G": s2img_june.select("june_B3"),
    "R": s2img_june.select("june_B4"),
    "RE1": s2img_june.select("june_B5"),
    "RE2": s2img_june.select("june_B6"),
    "RE3": s2img_june.select("june_B7"),
    "N": s2img_june.select("june_B8"),
    "N2": s2img_june.select("june_B8A"),
    "S1": s2img_june.select("june_B11"),
    "S2": s2img_june.select("june_B12"),
    "L":0.5,
    "g":2.5,
    "C1":6,
    "C2":7.5,
    "gamma":7.5,
    "alpha":7.5,
    "omega":7.5
}
var parameter_july = {
    "A": s2img_july.select("july_B1"),
    "B": s2img_july.select("july_B2"),
    "G": s2img_july.select("july_B3"),
    "R": s2img_july.select("july_B4"),
    "RE1": s2img_july.select("july_B5"),
    "RE2": s2img_july.select("july_B6"),
    "RE3": s2img_july.select("july_B7"),
    "N": s2img_july.select("july_B8"),
    "N2": s2img_july.select("july_B8A"),
    "S1": s2img_july.select("july_B11"),
    "S2": s2img_july.select("july_B12"),
    "L":0.5,
    "g":2.5,
    "C1":6,
    "C2":7.5,
    "gamma":7.5,
    "alpha":7.5,
    "omega":7.5
}
var parameter_august = {
    "A": s2img_august.select("august_B1"),
    "B": s2img_august.select("august_B2"),
    "G": s2img_august.select("august_B3"),
    "R": s2img_august.select("august_B4"),
    "RE1": s2img_august.select("august_B5"),
    "RE2": s2img_august.select("august_B6"),
    "RE3": s2img_august.select("august_B7"),
    "N": s2img_august.select("august_B8"),
    "N2": s2img_august.select("august_B8A"),
    "S1": s2img_august.select("august_B11"),
    "S2": s2img_august.select("august_B12"),
    "L":0.5,
    "g":2.5,
    "C1":6,
    "C2":7.5,
    "gamma":7.5,
    "alpha":7.5,
    "omega":7.5
}
var parameter_september = {
    "A": s2img_september.select("september_B1"),
    "B": s2img_september.select("september_B2"),
    "G": s2img_september.select("september_B3"),
    "R": s2img_september.select("september_B4"),
    "RE1": s2img_september.select("september_B5"),
    "RE2": s2img_september.select("september_B6"),
    "RE3": s2img_september.select("september_B7"),
    "N": s2img_september.select("september_B8"),
    "N2": s2img_september.select("september_B8A"),
    "S1": s2img_september.select("september_B11"),
    "S2": s2img_september.select("september_B12"),
    "L":0.5,
    "g":2.5,
    "C1":6,
    "C2":7.5,
    "gamma":7.5,
    "alpha":7.5,
    "omega":7.5
}
var parameter_october = {
    "A": s2img_october.select("october_B1"),
    "B": s2img_october.select("october_B2"),
    "G": s2img_october.select("october_B3"),
    "R": s2img_october.select("october_B4"),
    "RE1": s2img_october.select("october_B5"),
    "RE2": s2img_october.select("october_B6"),
    "RE3": s2img_october.select("october_B7"),
    "N": s2img_october.select("october_B8"),
    "N2": s2img_october.select("october_B8A"),
    "S1": s2img_october.select("october_B11"),
    "S2": s2img_october.select("october_B12"),
    "L":0.5,
    "g":2.5,
    "C1":6,
    "C2":7.5,
    "gamma":7.5,
    "alpha":7.5,
    "omega":7.5
}
// print(parameter_october)

// Spectral Index for May 
//vegetation
var s2img_may = spectral.computeIndex(s2img_may,["AFRI1600","AFRI2100","ARI","ARI2","ARVI",
"BCC","BNDVI","BWDRVI","CIG","CIRE","CVI",
"DSI","DSWI1","DSWI2","DSWI3","DSWI4","DSWI5",
"DVI","EVI","EVI2","ExG","ExGR","ExR",
"FCVI","GARI","GBNDVI","GCC","GEMI","GLI",
"GM1","GM2","GNDVI","GOSAVI","GRNDVI","GRVI",
"GSAVI","GVMI","IKAW","IPVI","IRECI","MCARI",
"MCARI1","MCARI2","MCARI705","MCARIOSAVI","MCARIOSAVI705","MGRVI",
"MNDVI","MNLI","MRBVI","MSAVI","MSI","MSR",
"MSR705","MTCI","MTVI1","MTVI2","ND705","NDDI",
"NDII","NDMI","NDREI","NDVI","NDVI705","NDYI",
"NGRDI","NIRv","NLI","NMDI","NRFIg","NRFIr",
"NormG","NormNIR","NormR","OSAVI","PSRI","RCC",
"RDVI","REDSI","RENDVI","RGBVI","RGRI","RI",
"RVI","S2REP","SARVI","SAVI","SIPI",
"SLAVI","SR","SR2","SR3","SR555","SR705",
"SeLI","TCARI","TCARIOSAVI","TCARIOSAVI705","TCI","TDVI",
"TGI","TRRVI","TTVI","TriVI","VARI",
"VARI700","VI700","VIG","WDRVI","mND705","mSR705"],parameter_may);
//soil
var s2img_may = spectral.computeIndex(s2img_may,["BI","BITM","BIXS","BaI","DBSI",
"EMBI","MBI","NDSoI","NSDS","NSDSI1",
"NSDSI2","NSDSI3","RI4XS"],parameter_may);
//urban
var s2img_may = spectral.computeIndex(s2img_may,["BLFEI","BRBA","IBI","NBAI","NDBI","NHFD",
"PISI","UI","VIBI","VgNIRBI","VrNIRBI"],parameter_may);
//water
var s2img_may = spectral.computeIndex(s2img_may,["ANDWI","AWEInsh","AWEIsh","LSWI","MBWI","MLSWI26",
"MLSWI27","MNDWI","MuWIR","NDCI","NDPonI","NDTI",
"NDVIMNDWI","NDWI","NWI","S2WI","SWM","TWI",
"WI1","WI2","WI2015","WRI"],parameter_may);

// Spectral Index for June 
//vegetation
var s2img_june = spectral.computeIndex(s2img_june,["AFRI1600","AFRI2100","ARI","ARI2","ARVI",
                                                                                "BCC","BNDVI","BWDRVI","CIG","CIRE","CVI",
                                                                                "DSI","DSWI1","DSWI2","DSWI3","DSWI4","DSWI5",
                                                                                "DVI","EVI","EVI2","ExG","ExGR","ExR",
                                                                                "FCVI","GARI","GBNDVI","GCC","GEMI","GLI",
                                                                                "GM1","GM2","GNDVI","GOSAVI","GRNDVI","GRVI",
                                                                                "GSAVI","GVMI","IKAW","IPVI","IRECI","MCARI",
                                                                                "MCARI1","MCARI2","MCARI705","MCARIOSAVI","MCARIOSAVI705","MGRVI",
                                                                                "MNDVI","MNLI","MRBVI","MSAVI","MSI","MSR",
                                                                                "MSR705","MTCI","MTVI1","MTVI2","ND705","NDDI",
                                                                                "NDII","NDMI","NDREI","NDVI","NDVI705","NDYI",
                                                                                "NGRDI","NIRv","NLI","NMDI","NRFIg","NRFIr",
                                                                                "NormG","NormNIR","NormR","OSAVI","PSRI","RCC",
                                                                                "RDVI","REDSI","RENDVI","RGBVI","RGRI","RI",
                                                                                "RVI","S2REP","SARVI","SAVI","SIPI",
                                                                                "SLAVI","SR","SR2","SR3","SR555","SR705",
                                                                                "SeLI","TCARI","TCARIOSAVI","TCARIOSAVI705","TCI","TDVI",
                                                                                "TGI","TRRVI","TTVI","TriVI","VARI",
                                                                                "VARI700","VI700","VIG","WDRVI","mND705","mSR705"],parameter_june);
//soil
var s2img_june = spectral.computeIndex(s2img_june,["BI","BITM","BIXS","BaI","DBSI",
                                                                                "EMBI","MBI","NDSoI","NSDS","NSDSI1",
                                                                                "NSDSI2","NSDSI3","RI4XS"],parameter_june);
//urban
var s2img_june = spectral.computeIndex(s2img_june,["BLFEI","BRBA","IBI","NBAI","NDBI","NHFD",
                                                                                "PISI","UI","VIBI","VgNIRBI","VrNIRBI"],parameter_june);
//water
var s2img_june = spectral.computeIndex(s2img_june,["ANDWI","AWEInsh","AWEIsh","LSWI","MBWI","MLSWI26",
                                                                                "MLSWI27","MNDWI","MuWIR","NDCI","NDPonI","NDTI",
                                                                                "NDVIMNDWI","NDWI","NWI","S2WI","SWM","TWI",
                                                                                "WI1","WI2","WI2015","WRI"],parameter_june);

// Spectral Index for July
//vegetation
var s2img_july = spectral.computeIndex(s2img_july,["AFRI1600","AFRI2100","ARI","ARI2","ARVI",
                                                                                "BCC","BNDVI","BWDRVI","CIG","CIRE","CVI",
                                                                                "DSI","DSWI1","DSWI2","DSWI3","DSWI4","DSWI5",
                                                                                "DVI","EVI","EVI2","ExG","ExGR","ExR",
                                                                                "FCVI","GARI","GBNDVI","GCC","GEMI","GLI",
                                                                                "GM1","GM2","GNDVI","GOSAVI","GRNDVI","GRVI",
                                                                                "GSAVI","GVMI","IKAW","IPVI","IRECI","MCARI",
                                                                                "MCARI1","MCARI2","MCARI705","MCARIOSAVI","MCARIOSAVI705","MGRVI",
                                                                                "MNDVI","MNLI","MRBVI","MSAVI","MSI","MSR",
                                                                                "MSR705","MTCI","MTVI1","MTVI2","ND705","NDDI",
                                                                                "NDII","NDMI","NDREI","NDVI","NDVI705","NDYI",
                                                                                "NGRDI","NIRv","NLI","NMDI","NRFIg","NRFIr",
                                                                                "NormG","NormNIR","NormR","OSAVI","PSRI","RCC",
                                                                                "RDVI","REDSI","RENDVI","RGBVI","RGRI","RI",
                                                                                "RVI","S2REP","SARVI","SAVI","SIPI",
                                                                                "SLAVI","SR","SR2","SR3","SR555","SR705",
                                                                                "SeLI","TCARI","TCARIOSAVI","TCARIOSAVI705","TCI","TDVI",
                                                                                "TGI","TRRVI","TTVI","TriVI","VARI",
                                                                                "VARI700","VI700","VIG","WDRVI","mND705","mSR705"],parameter_july);
//soil
var s2img_july = spectral.computeIndex(s2img_july,["BI","BITM","BIXS","BaI","DBSI",
                                                                                "EMBI","MBI","NDSoI","NSDS","NSDSI1",
                                                                                "NSDSI2","NSDSI3","RI4XS"],parameter_july);
//urban
var s2img_july = spectral.computeIndex(s2img_july,["BLFEI","BRBA","IBI","NBAI","NDBI","NHFD",
                                                                                "PISI","UI","VIBI","VgNIRBI","VrNIRBI"],parameter_july);
//water
var s2img_july = spectral.computeIndex(s2img_july,["ANDWI","AWEInsh","AWEIsh","LSWI","MBWI","MLSWI26",
                                                                                "MLSWI27","MNDWI","MuWIR","NDCI","NDPonI","NDTI",
                                                                                "NDVIMNDWI","NDWI","NWI","S2WI","SWM","TWI",
                                                                                "WI1","WI2","WI2015","WRI"],parameter_july);

// Spectral Index for August
//vegetation
var s2img_august = spectral.computeIndex(s2img_august,["AFRI1600","AFRI2100","ARI","ARI2","ARVI",
                                                                                "BCC","BNDVI","BWDRVI","CIG","CIRE","CVI",
                                                                                "DSI","DSWI1","DSWI2","DSWI3","DSWI4","DSWI5",
                                                                                "DVI","EVI","EVI2","ExG","ExGR","ExR",
                                                                                "FCVI","GARI","GBNDVI","GCC","GEMI","GLI",
                                                                                "GM1","GM2","GNDVI","GOSAVI","GRNDVI","GRVI",
                                                                                "GSAVI","GVMI","IKAW","IPVI","IRECI","MCARI",
                                                                                "MCARI1","MCARI2","MCARI705","MCARIOSAVI","MCARIOSAVI705","MGRVI",
                                                                                "MNDVI","MNLI","MRBVI","MSAVI","MSI","MSR",
                                                                                "MSR705","MTCI","MTVI1","MTVI2","ND705","NDDI",
                                                                                "NDII","NDMI","NDREI","NDVI","NDVI705","NDYI",
                                                                                "NGRDI","NIRv","NLI","NMDI","NRFIg","NRFIr",
                                                                                "NormG","NormNIR","NormR","OSAVI","PSRI","RCC",
                                                                                "RDVI","REDSI","RENDVI","RGBVI","RGRI","RI",
                                                                                "RVI","S2REP","SARVI","SAVI","SIPI",
                                                                                "SLAVI","SR","SR2","SR3","SR555","SR705",
                                                                                "SeLI","TCARI","TCARIOSAVI","TCARIOSAVI705","TCI","TDVI",
                                                                                "TGI","TRRVI","TTVI","TriVI","VARI",
                                                                                "VARI700","VI700","VIG","WDRVI","mND705","mSR705"],parameter_august);
//soil
var s2img_august = spectral.computeIndex(s2img_august,["BI","BITM","BIXS","BaI","DBSI",
                                                                                "EMBI","MBI","NDSoI","NSDS","NSDSI1",
                                                                                "NSDSI2","NSDSI3","RI4XS"],parameter_august);
//urban
var s2img_august = spectral.computeIndex(s2img_august,["BLFEI","BRBA","IBI","NBAI","NDBI","NHFD",
                                                                                "PISI","UI","VIBI","VgNIRBI","VrNIRBI"],parameter_august);
//water
var s2img_august = spectral.computeIndex(s2img_august,["ANDWI","AWEInsh","AWEIsh","LSWI","MBWI","MLSWI26",
                                                                                "MLSWI27","MNDWI","MuWIR","NDCI","NDPonI","NDTI",
                                                                                "NDVIMNDWI","NDWI","NWI","S2WI","SWM","TWI",
                                                                                "WI1","WI2","WI2015","WRI"],parameter_august);

// Spectral Index for September
//vegetation
var s2img_september = spectral.computeIndex(s2img_september,["AFRI1600","AFRI2100","ARI","ARI2","ARVI",
                                                                                "BCC","BNDVI","BWDRVI","CIG","CIRE","CVI",
                                                                                "DSI","DSWI1","DSWI2","DSWI3","DSWI4","DSWI5",
                                                                                "DVI","EVI","EVI2","ExG","ExGR","ExR",
                                                                                "FCVI","GARI","GBNDVI","GCC","GEMI","GLI",
                                                                                "GM1","GM2","GNDVI","GOSAVI","GRNDVI","GRVI",
                                                                                "GSAVI","GVMI","IKAW","IPVI","IRECI","MCARI",
                                                                                "MCARI1","MCARI2","MCARI705","MCARIOSAVI","MCARIOSAVI705","MGRVI",
                                                                                "MNDVI","MNLI","MRBVI","MSAVI","MSI","MSR",
                                                                                "MSR705","MTCI","MTVI1","MTVI2","ND705","NDDI",
                                                                                "NDII","NDMI","NDREI","NDVI","NDVI705","NDYI",
                                                                                "NGRDI","NIRv","NLI","NMDI","NRFIg","NRFIr",
                                                                                "NormG","NormNIR","NormR","OSAVI","PSRI","RCC",
                                                                                "RDVI","REDSI","RENDVI","RGBVI","RGRI","RI",
                                                                                "RVI","S2REP","SARVI","SAVI","SIPI",
                                                                                "SLAVI","SR","SR2","SR3","SR555","SR705",
                                                                                "SeLI","TCARI","TCARIOSAVI","TCARIOSAVI705","TCI","TDVI",
                                                                                "TGI","TRRVI","TTVI","TriVI","VARI",
                                                                                "VARI700","VI700","VIG","WDRVI","mND705","mSR705"],parameter_september);
//soil
var s2img_september = spectral.computeIndex(s2img_september,["BI","BITM","BIXS","BaI","DBSI",
                                                                                "EMBI","MBI","NDSoI","NSDS","NSDSI1",
                                                                                "NSDSI2","NSDSI3","RI4XS"],parameter_september);
//urban
var s2img_september = spectral.computeIndex(s2img_september,["BLFEI","BRBA","IBI","NBAI","NDBI","NHFD",
                                                                                "PISI","UI","VIBI","VgNIRBI","VrNIRBI"],parameter_september);
//water
var s2img_september = spectral.computeIndex(s2img_september,["ANDWI","AWEInsh","AWEIsh","LSWI","MBWI","MLSWI26",
                                                                                "MLSWI27","MNDWI","MuWIR","NDCI","NDPonI","NDTI",
                                                                                "NDVIMNDWI","NDWI","NWI","S2WI","SWM","TWI",
                                                                                "WI1","WI2","WI2015","WRI"],parameter_september);

// Spectral Index for October
//vegetation
var s2img_october = spectral.computeIndex(s2img_october,["AFRI1600","AFRI2100","ARI","ARI2","ARVI",
                                                                                "BCC","BNDVI","BWDRVI","CIG","CIRE","CVI",
                                                                                "DSI","DSWI1","DSWI2","DSWI3","DSWI4","DSWI5",
                                                                                "DVI","EVI","EVI2","ExG","ExGR","ExR",
                                                                                "FCVI","GARI","GBNDVI","GCC","GEMI","GLI",
                                                                                "GM1","GM2","GNDVI","GOSAVI","GRNDVI","GRVI",
                                                                                "GSAVI","GVMI","IKAW","IPVI","IRECI","MCARI",
                                                                                "MCARI1","MCARI2","MCARI705","MCARIOSAVI","MCARIOSAVI705","MGRVI",
                                                                                "MNDVI","MNLI","MRBVI","MSAVI","MSI","MSR",
                                                                                "MSR705","MTCI","MTVI1","MTVI2","ND705","NDDI",
                                                                                "NDII","NDMI","NDREI","NDVI","NDVI705","NDYI",
                                                                                "NGRDI","NIRv","NLI","NMDI","NRFIg","NRFIr",
                                                                                "NormG","NormNIR","NormR","OSAVI","PSRI","RCC",
                                                                                "RDVI","REDSI","RENDVI","RGBVI","RGRI","RI",
                                                                                "RVI","S2REP","SARVI","SAVI","SIPI",
                                                                                "SLAVI","SR","SR2","SR3","SR555","SR705",
                                                                                "SeLI","TCARI","TCARIOSAVI","TCARIOSAVI705","TCI","TDVI",
                                                                                "TGI","TRRVI","TTVI","TriVI","VARI",
                                                                                "VARI700","VI700","VIG","WDRVI","mND705","mSR705"],parameter_october);
//soil
var s2img_october = spectral.computeIndex(s2img_october,["BI","BITM","BIXS","BaI","DBSI",
                                                                                "EMBI","MBI","NDSoI","NSDS","NSDSI1",
                                                                                "NSDSI2","NSDSI3","RI4XS"],parameter_october);
//urban
var s2img_october = spectral.computeIndex(s2img_october,["BLFEI","BRBA","IBI","NBAI","NDBI","NHFD",
                                                                                "PISI","UI","VIBI","VgNIRBI","VrNIRBI"],parameter_october);
//water
var s2img_october = spectral.computeIndex(s2img_october,["ANDWI","AWEInsh","AWEIsh","LSWI","MBWI","MLSWI26",
                                                                                "MLSWI27","MNDWI","MuWIR","NDCI","NDPonI","NDTI",
                                                                                "NDVIMNDWI","NDWI","NWI","S2WI","SWM","TWI",
                                                                                "WI1","WI2","WI2015","WRI"],parameter_october);

// Topographic index resampled to 10 meters
var elevation_new = elevation.resample('bilinear')
                        .reproject({
                        crs: elevation.projection(),
                        scale:10
                        }).rename('elevation_new');
var slope_new = slope.resample('bilinear')
                        .reproject({
                        crs: elevation.projection(),
                        scale:10
                        }).rename('slope_new');
var aspect_new = slope.resample('bilinear')
                        .reproject({
                        crs: elevation.projection(),
                        scale:10
                        }).rename('aspect_new');
var plan_curvature_new = plan_curvature.resample('bilinear')
                        .reproject({
                        crs: elevation.projection(),
                        scale:10
                        }).rename('plan_curvature_new');
var profile_curvature_new = profile_curvature.resample('bilinear')
                        .reproject({
                        crs: elevation.projection(),
                        scale:10
                        }).rename('profile_curvature_new');
var convergence_index_new = convergence_index.resample('bilinear')
                        .reproject({
                        crs: elevation.projection(),
                        scale:10
                        }).rename('convergence_index_new');
var topographic_wetness_index_new = topographic_wetness_index.resample('bilinear')
                        .reproject({
                        crs: elevation.projection(),
                        scale:10
                        }).rename('topographic_wetness_index_new');
var relative_slope_position_new = relative_slope_position.resample('bilinear')
                        .reproject({
                        crs: elevation.projection(),
                        scale:10
                        }).rename('relative_slope_position_new');
// print(elevation_new,'elevation_new');
// print(slope_new,'slope_new');
// print(aspect_new,'aspect_new');
// print(plan_curvature_new,'plan_curvature_new');
// print(profile_curvature_new,'profile_curvature_new');
// print(convergence_index_new,'convergence_index_new');
// print(topographic_wetness_index_new,'topographic_wetness_index_new');
// print(relative_slope_position_new,'relative_slope_position_new');


////////////////////////////////////////////////////////////////////////////////
//////////////////////     Sentinel-1 Image Collection    /////////////////////
///////////////////////////////////////////////////////////////////////////////
var wrapper = require('users/adugnagirma/gee_s1_ard:wrapper');
var helper = require('users/adugnagirma/gee_s1_ard:utilities');

//---------------------------------------------------------------------------//
// DEFINE PARAMETERS
//---------------------------------------------------------------------------//

var parameter_may = {//1. Data Selection
              START_DATE: "2020-05-01",
              STOP_DATE: "2020-05-31",
              POLARIZATION:'VVVH',
              ORBIT : 'DESCENDING',
              GEOMETRY: roi, //Uncomment if providing coordinates
              // //2. Additional Border noise correction
              // APPLY_ADDITIONAL_BORDER_NOISE_CORRECTION: true,
              //3.Speckle filter
              APPLY_SPECKLE_FILTERING: true,
              SPECKLE_FILTER_FRAMEWORK: 'MULTI',
              SPECKLE_FILTER: 'REFINED LEE',
              SPECKLE_FILTER_KERNEL_SIZE: 9,
              SPECKLE_FILTER_NR_OF_IMAGES: 10,
              // //4. Radiometric terrain normalization
              // APPLY_TERRAIN_FLATTENING: true,
              // DEM: ee.Image('USGS/SRTMGL1_003'),
              // TERRAIN_FLATTENING_MODEL: 'VOLUME',              //TERRAIN_FLATTENING_ADDITIONAL_LAYOVER_SHADOW_BUFFER: 0,
              //5. Output
              FORMAT : 'DB',
              CLIP_TO_ROI: false,
              SAVE_ASSETS: false
}

var parameter_june = {//1. Data Selection
              START_DATE: "2020-06-01",
              STOP_DATE: "2020-06-30",
              POLARIZATION:'VVVH',
              ORBIT : 'DESCENDING',
              GEOMETRY: roi, //Uncomment if providing coordinates
              // //2. Additional Border noise correction
              // APPLY_ADDITIONAL_BORDER_NOISE_CORRECTION: true,
              //3.Speckle filter
              APPLY_SPECKLE_FILTERING: true,
              SPECKLE_FILTER_FRAMEWORK: 'MULTI',
              SPECKLE_FILTER: 'REFINED LEE',
              SPECKLE_FILTER_KERNEL_SIZE: 9,
              SPECKLE_FILTER_NR_OF_IMAGES: 10,
              // //4. Radiometric terrain normalization
              // APPLY_TERRAIN_FLATTENING: true,
              // DEM: ee.Image('USGS/SRTMGL1_003'),
              // TERRAIN_FLATTENING_MODEL: 'VOLUME',              //TERRAIN_FLATTENING_ADDITIONAL_LAYOVER_SHADOW_BUFFER: 0,
              //5. Output
              FORMAT : 'DB',
              CLIP_TO_ROI: false,
              SAVE_ASSETS: false
}

var parameter_july = {//1. Data Selection
              START_DATE: "2020-07-01",
              STOP_DATE: "2020-07-31",
              POLARIZATION:'VVVH',
              ORBIT : 'DESCENDING',
              GEOMETRY: roi, //Uncomment if providing coordinates
              // //2. Additional Border noise correction
              // APPLY_ADDITIONAL_BORDER_NOISE_CORRECTION: true,
              //3.Speckle filter
              APPLY_SPECKLE_FILTERING: true,
              SPECKLE_FILTER_FRAMEWORK: 'MULTI',
              SPECKLE_FILTER: 'REFINED LEE',
              SPECKLE_FILTER_KERNEL_SIZE: 9,
              SPECKLE_FILTER_NR_OF_IMAGES: 10,
              // //4. Radiometric terrain normalization
              // APPLY_TERRAIN_FLATTENING: true,
              // DEM: ee.Image('USGS/SRTMGL1_003'),
              // TERRAIN_FLATTENING_MODEL: 'VOLUME',              //TERRAIN_FLATTENING_ADDITIONAL_LAYOVER_SHADOW_BUFFER: 0,
              //5. Output
              FORMAT : 'DB',
              CLIP_TO_ROI: false,
              SAVE_ASSETS: false
}

var parameter_august = {//1. Data Selection
              START_DATE: "2020-08-01",
              STOP_DATE: "2020-08-31",
              POLARIZATION:'VVVH',
              ORBIT : 'DESCENDING',
              GEOMETRY: roi, //Uncomment if providing coordinates
              // //2. Additional Border noise correction
              // APPLY_ADDITIONAL_BORDER_NOISE_CORRECTION: true,
              //3.Speckle filter
              APPLY_SPECKLE_FILTERING: true,
              SPECKLE_FILTER_FRAMEWORK: 'MULTI',
              SPECKLE_FILTER: 'REFINED LEE',
              SPECKLE_FILTER_KERNEL_SIZE: 9,
              SPECKLE_FILTER_NR_OF_IMAGES: 10,
              // //4. Radiometric terrain normalization
              // APPLY_TERRAIN_FLATTENING: true,
              // DEM: ee.Image('USGS/SRTMGL1_003'),
              // TERRAIN_FLATTENING_MODEL: 'VOLUME',              //TERRAIN_FLATTENING_ADDITIONAL_LAYOVER_SHADOW_BUFFER: 0,
              //5. Output
              FORMAT : 'DB',
              CLIP_TO_ROI: false,
              SAVE_ASSETS: false
}

var parameter_september = {//1. Data Selection
              START_DATE: "2020-09-01",
              STOP_DATE: "2020-09-30",
              POLARIZATION:'VVVH',
              ORBIT : 'DESCENDING',
              GEOMETRY: roi, //Uncomment if providing coordinates
              // //2. Additional Border noise correction
              // APPLY_ADDITIONAL_BORDER_NOISE_CORRECTION: true,
              //3.Speckle filter
              APPLY_SPECKLE_FILTERING: true,
              SPECKLE_FILTER_FRAMEWORK: 'MULTI',
              SPECKLE_FILTER: 'REFINED LEE',
              SPECKLE_FILTER_KERNEL_SIZE: 9,
              SPECKLE_FILTER_NR_OF_IMAGES: 10,
              // //4. Radiometric terrain normalization
              // APPLY_TERRAIN_FLATTENING: true,
              // DEM: ee.Image('USGS/SRTMGL1_003'),
              // TERRAIN_FLATTENING_MODEL: 'VOLUME',              //TERRAIN_FLATTENING_ADDITIONAL_LAYOVER_SHADOW_BUFFER: 0,
              //5. Output
              FORMAT : 'DB',
              CLIP_TO_ROI: false,
              SAVE_ASSETS: false
}

var parameter_october = {//1. Data Selection
              START_DATE: "2020-10-01",
              STOP_DATE: "2020-10-30",
              POLARIZATION:'VVVH',
              ORBIT : 'DESCENDING',
              GEOMETRY: roi, //Uncomment if providing coordinates
              // //2. Additional Border noise correction
              // APPLY_ADDITIONAL_BORDER_NOISE_CORRECTION: true,
              //3.Speckle filter
              APPLY_SPECKLE_FILTERING: true,
              SPECKLE_FILTER_FRAMEWORK: 'MULTI',
              SPECKLE_FILTER: 'REFINED LEE',
              SPECKLE_FILTER_KERNEL_SIZE: 9,
              SPECKLE_FILTER_NR_OF_IMAGES: 10,
              // //4. Radiometric terrain normalization
              // APPLY_TERRAIN_FLATTENING: true,
              // DEM: ee.Image('USGS/SRTMGL1_003'),
              // TERRAIN_FLATTENING_MODEL: 'VOLUME',              //TERRAIN_FLATTENING_ADDITIONAL_LAYOVER_SHADOW_BUFFER: 0,
              //5. Output
              FORMAT : 'DB',
              CLIP_TO_ROI: false,
              SAVE_ASSETS: false
}

//---------------------------------------------------------------------------//
// DO THE JOB
//---------------------------------------------------------------------------//
      
//Preprocess the S1 collection
var s1_preprocces_may = wrapper.s1_preproc(parameter_may);
var s1_may = s1_preprocces_may[0]
s1_preprocces_may = s1_preprocces_may[1]

var s1_preprocces_june = wrapper.s1_preproc(parameter_june);
var s1_june = s1_preprocces_june[0]
s1_preprocces_june = s1_preprocces_june[1]

var s1_preprocces_july = wrapper.s1_preproc(parameter_july);
var s1_july = s1_preprocces_july[0]
s1_preprocces_july = s1_preprocces_july[1]

var s1_preprocces_august = wrapper.s1_preproc(parameter_august);
var s1_august = s1_preprocces_august[0]
s1_preprocces_august = s1_preprocces_august[1]

var s1_preprocces_september = wrapper.s1_preproc(parameter_september);
var s1_september = s1_preprocces_september[0]
s1_preprocces_september = s1_preprocces_september[1]

var s1_preprocces_october = wrapper.s1_preproc(parameter_october);
var s1_october = s1_preprocces_october[0]
s1_preprocces_october = s1_preprocces_october[1]

var visparam_may = {}
if (parameter_may.POLARIZATION=='VVVH'){
    if (parameter_may.FORMAT=='DB'){
    var s1_preprocces_view_may = s1_preprocces_may.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    var s1_view_may = s1_may.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    visparam_may = {bands:['VV','VH','VVVH_ratio'],min: [-20, -25, 1],max: [0, -5, 15]}
    }
    else {
    var s1_preprocces_view_may = s1_preprocces_may.map(helper.add_ratio_lin);
    var s1_view_may = s1.map(helper.add_ratio_lin);
    visparam_may = {bands:['VV','VH','VVVH_ratio'], min: [0.01, 0.0032, 1.25],max: [1, 0.31, 31.62]}
    }
}
else {
    if (parameter_may.FORMAT=='DB') {
    s1_preprocces_view_may = s1_preprocces_may.map(helper.lin_to_db);
    s1_view_may = s1_may.map(helper.lin_to_db);
    visparam_may = {bands:[parameter.POLARIZATION],min: -25,max: 0}   
    }
    else {
    s1_preprocces_view_may = s1_preprocces_may;
    s1_view_may = s1_may;
    visparam_may = {bands:[parameter.POLARIZATION],min: 0,max: 0.2}
    }
}

var visparam_june = {}
if (parameter_june.POLARIZATION=='VVVH'){
    if (parameter_june.FORMAT=='DB'){
    var s1_preprocces_view_june = s1_preprocces_june.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    var s1_view_june = s1_june.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    visparam_june = {bands:['VV','VH','VVVH_ratio'],min: [-20, -25, 1],max: [0, -5, 15]}
    }
    else {
    var s1_preprocces_view_june = s1_preprocces_june.map(helper.add_ratio_lin);
    var s1_view_june = s1.map(helper.add_ratio_lin);
    visparam_june = {bands:['VV','VH','VVVH_ratio'], min: [0.01, 0.0032, 1.25],max: [1, 0.31, 31.62]}
    }
}
else {
    if (parameter_june.FORMAT=='DB') {
    s1_preprocces_view_june = s1_preprocces_june.map(helper.lin_to_db);
    s1_view_june = s1_june.map(helper.lin_to_db);
    visparam_june = {bands:[parameter.POLARIZATION],min: -25,max: 0}   
    }
    else {
    s1_preprocces_view_june = s1_preprocces_june;
    s1_view_june = s1_june;
    visparam_june = {bands:[parameter.POLARIZATION],min: 0,max: 0.2}
    }
}

var visparam_july = {}
if (parameter_july.POLARIZATION=='VVVH'){
    if (parameter_july.FORMAT=='DB'){
    var s1_preprocces_view_july = s1_preprocces_july.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    var s1_view_july = s1_july.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    visparam_july = {bands:['VV','VH','VVVH_ratio'],min: [-20, -25, 1],max: [0, -5, 15]}
    }
    else {
    var s1_preprocces_view_july = s1_preprocces_july.map(helper.add_ratio_lin);
    var s1_view_july = s1.map(helper.add_ratio_lin);
    visparam_july = {bands:['VV','VH','VVVH_ratio'], min: [0.01, 0.0032, 1.25],max: [1, 0.31, 31.62]}
    }
}
else {
    if (parameter_july.FORMAT=='DB') {
    s1_preprocces_view_july = s1_preprocces_july.map(helper.lin_to_db);
    s1_view_july = s1_july.map(helper.lin_to_db);
    visparam_july = {bands:[parameter.POLARIZATION],min: -25,max: 0}   
    }
    else {
    s1_preprocces_view_july = s1_preprocces_july;
    s1_view_july = s1_july;
    visparam_july = {bands:[parameter.POLARIZATION],min: 0,max: 0.2}
    }
}

var visparam_august = {}
if (parameter_august.POLARIZATION=='VVVH'){
    if (parameter_august.FORMAT=='DB'){
    var s1_preprocces_view_august = s1_preprocces_august.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    var s1_view_august = s1_august.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    visparam_august = {bands:['VV','VH','VVVH_ratio'],min: [-20, -25, 1],max: [0, -5, 15]}
    }
    else {
    var s1_preprocces_view_august = s1_preprocces_august.map(helper.add_ratio_lin);
    var s1_view_august = s1.map(helper.add_ratio_lin);
    visparam_august = {bands:['VV','VH','VVVH_ratio'], min: [0.01, 0.0032, 1.25],max: [1, 0.31, 31.62]}
    }
}
else {
    if (parameter_august.FORMAT=='DB') {
    s1_preprocces_view_august = s1_preprocces_august.map(helper.lin_to_db);
    s1_view_august = s1_august.map(helper.lin_to_db);
    visparam_august = {bands:[parameter.POLARIZATION],min: -25,max: 0}   
    }
    else {
    s1_preprocces_view_august = s1_preprocces_august;
    s1_view_august = s1_august;
    visparam_august = {bands:[parameter.POLARIZATION],min: 0,max: 0.2}
    }
}

var visparam_september = {}
if (parameter_september.POLARIZATION=='VVVH'){
    if (parameter_september.FORMAT=='DB'){
    var s1_preprocces_view_september = s1_preprocces_september.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    var s1_view_september = s1_september.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    visparam_september = {bands:['VV','VH','VVVH_ratio'],min: [-20, -25, 1],max: [0, -5, 15]}
    }
    else {
    var s1_preprocces_view_september = s1_preprocces_september.map(helper.add_ratio_lin);
    var s1_view_september = s1.map(helper.add_ratio_lin);
    visparam_september = {bands:['VV','VH','VVVH_ratio'], min: [0.01, 0.0032, 1.25],max: [1, 0.31, 31.62]}
    }
}
else {
    if (parameter_september.FORMAT=='DB') {
    s1_preprocces_view_september = s1_preprocces_september.map(helper.lin_to_db);
    s1_view_september = s1_september.map(helper.lin_to_db);
    visparam_september = {bands:[parameter.POLARIZATION],min: -25,max: 0}   
    }
    else {
    s1_preprocces_view_september = s1_preprocces_september;
    s1_view_september = s1_september;
    visparam_september = {bands:[parameter.POLARIZATION],min: 0,max: 0.2}
    }
}

var visparam_october = {}
if (parameter_october.POLARIZATION=='VVVH'){
    if (parameter_october.FORMAT=='DB'){
    var s1_preprocces_view_october = s1_preprocces_october.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    var s1_view_october = s1_october.map(helper.add_ratio_lin).map(helper.lin_to_db2);
    visparam_october = {bands:['VV','VH','VVVH_ratio'],min: [-20, -25, 1],max: [0, -5, 15]}
    }
    else {
    var s1_preprocces_view_october = s1_preprocces_october.map(helper.add_ratio_lin);
    var s1_view_october = s1.map(helper.add_ratio_lin);
    visparam_october = {bands:['VV','VH','VVVH_ratio'], min: [0.01, 0.0032, 1.25],max: [1, 0.31, 31.62]}
    }
}
else {
    if (parameter_october.FORMAT=='DB') {
    s1_preprocces_view_october = s1_preprocces_october.map(helper.lin_to_db);
    s1_view_october = s1_october.map(helper.lin_to_db);
    visparam_october = {bands:[parameter.POLARIZATION],min: -25,max: 0}   
    }
    else {
    s1_preprocces_view_october = s1_preprocces_october;
    s1_view_october = s1_october;
    visparam_october = {bands:[parameter.POLARIZATION],min: 0,max: 0.2}
    }
}

//May polarization index 
var desc_may = s1_view_may.median().unmask(0).clip(roi);
var parameter_may = {
    "VV": desc_may.select("VV"),
    "VH": desc_may.select("VH")
};
var desc_may = spectral.computeIndex(desc_may,["DPDD","DpRVIVV","NDPolI","VDDPI","VHVVD","VHVVP","VHVVR","VVVHD","VVVHR","VVVHS"],parameter_may);
var desc_vvmay = desc_may.select('VV');
var desc_vhmay = desc_may.select('VH');
var desc_vv2vhmay = desc_vvmay.select('VV').add(desc_vhmay.select('VH').add(desc_vhmay.select('VH'))).rename('VV2VH');
var desc_vh2vvmay = desc_vhmay.select('VH').add(desc_vvmay.select('VV').add(desc_vvmay.select('VV'))).rename('VH2VV');
//print(desc_may,'desc_may');

//June polarization index
var desc_june = s1_view_june.median().unmask(0).clip(roi);
var parameter_june = {
    "VV": desc_june.select("VV"),
    "VH": desc_june.select("VH")
};
var desc_june = spectral.computeIndex(desc_june,["DPDD","DpRVIVV","NDPolI","VDDPI","VHVVD","VHVVP","VHVVR","VVVHD","VVVHR","VVVHS"],parameter_june);
var desc_vvjune = desc_june.select('VV');
var desc_vhjune = desc_june.select('VH');
var desc_vv2vhjune = desc_vvjune.select('VV').add(desc_vhjune.select('VH').add(desc_vhjune.select('VH'))).rename('VV2VH');
var desc_vh2vvjune = desc_vhjune.select('VH').add(desc_vvjune.select('VV').add(desc_vvjune.select('VV'))).rename('VH2VV');
//print(desc_june,'desc_june');

//July polarization index
var desc_july = s1_view_july.median().unmask(0).clip(roi);
var parameter_july = {
    "VV": desc_july.select("VV"),
    "VH": desc_july.select("VH")
};
var desc_july = spectral.computeIndex(desc_july,["DPDD","DpRVIVV","NDPolI","VDDPI","VHVVD","VHVVP","VHVVR","VVVHD","VVVHR","VVVHS"],parameter_july);
var desc_vvjuly = desc_july.select('VV');
var desc_vhjuly = desc_july.select('VH');
var desc_vv2vhjuly = desc_vvjuly.select('VV').add(desc_vhjuly.select('VH').add(desc_vhjuly.select('VH'))).rename('VV2VH');
var desc_vh2vvjuly = desc_vhjuly.select('VH').add(desc_vvjuly.select('VV').add(desc_vvjuly.select('VV'))).rename('VH2VV');
// print(desc_july,'desc_july');

//August polarization index
var desc_august = s1_view_august.median().unmask(0).clip(roi);
var parameter_august = {
    "VV": desc_august.select("VV"),
    "VH": desc_august.select("VH")
};
var desc_august = spectral.computeIndex(desc_august,["DPDD","DpRVIVV","NDPolI","VDDPI","VHVVD","VHVVP","VHVVR","VVVHD","VVVHR","VVVHS"],parameter_august);
var desc_vvaugust = desc_august.select('VV');
var desc_vhaugust = desc_august.select('VH');
var desc_vv2vhaugust = desc_vvaugust.select('VV').add(desc_vhaugust.select('VH').add(desc_vhaugust.select('VH'))).rename('VV2VH');
var desc_vh2vvaugust = desc_vhaugust.select('VH').add(desc_vvaugust.select('VV').add(desc_vvaugust.select('VV'))).rename('VH2VV');
// print(desc_august,'desc_august');

//September polarization index
var desc_september = s1_view_september.median().unmask(0).clip(roi);
var parameter_september = {
    "VV": desc_september.select("VV"),
    "VH": desc_september.select("VH")
};
var desc_september = spectral.computeIndex(desc_september,["DPDD","DpRVIVV","NDPolI","VDDPI","VHVVD","VHVVP","VHVVR","VVVHD","VVVHR","VVVHS"],parameter_september);
var desc_vvseptember = desc_september.select('VV');
var desc_vhseptember = desc_september.select('VH');
var desc_vv2vhseptember = desc_vvseptember.select('VV').add(desc_vhseptember.select('VH').add(desc_vhseptember.select('VH'))).rename('VV2VH');
var desc_vh2vvseptember = desc_vhseptember.select('VH').add(desc_vvseptember.select('VV').add(desc_vvseptember.select('VV'))).rename('VH2VV');
// print(desc_september,'desc_september');

//October polarization index
var desc_october = s1_view_october.median().unmask(0).clip(roi);
var parameter_october = {
    "VV": desc_october.select("VV"),
    "VH": desc_october.select("VH")
};
var desc_october = spectral.computeIndex(desc_october,["DPDD","DpRVIVV","NDPolI","VDDPI","VHVVD","VHVVP","VHVVR","VVVHD","VVVHR","VVVHS"],parameter_october);
var desc_vvoctober = desc_october.select('VV');
var desc_vhoctober = desc_october.select('VH');
var desc_vv2vhoctober = desc_vvoctober.select('VV').add(desc_vhoctober.select('VH').add(desc_vhoctober.select('VH'))).rename('VV2VH');
var desc_vh2vvoctober = desc_vhoctober.select('VH').add(desc_vvoctober.select('VV').add(desc_vvoctober.select('VV'))).rename('VH2VV');
// print(desc_october,'desc_october');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initial band synthesis (all initial bands are filtered for significance using recursive feature elimination (rfe), filtering is done locally using python) 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var construct_img = s2img_may.addBands([
                          s2img_june.select('june_B1'), 
                          s2img_june.select('june_B2'), 
                          s2img_june.select('june_B3'), 
                          s2img_june.select('june_B4'), 
                          s2img_june.select('june_B5'), 
                          s2img_june.select('june_B6'), 
                          s2img_june.select('june_B7'), 
                          s2img_june.select('june_B8'), 
                          s2img_june.select('june_B8A'), 
                          s2img_june.select('june_B9'), 
                          s2img_june.select('june_B11'), 
                          s2img_june.select('june_B12'), 
                          s2img_june.select('AFRI1600').rename('june_AFRI1600'), 
                          s2img_june.select('AFRI2100').rename('june_AFRI2100'), 
                          s2img_june.select('ARI').rename('june_ARI'), 
                          s2img_june.select('ARI2').rename('june_ARI2'), 
                          s2img_june.select('ARVI').rename('june_ARVI'), 
                          s2img_june.select('AVI').rename('june_AVI'), 
                          s2img_june.select('BCC').rename('june_BCC'), 
                          s2img_june.select('BNDVI').rename('june_BNDVI'), 
                          s2img_june.select('BWDRVI').rename('june_BWDRVI'), 
                          s2img_june.select('CIG').rename('june_CIG'), 
                          s2img_june.select('CIRE').rename('june_CIRE'), 
                          s2img_june.select('CVI').rename('june_CVI'), 
                          s2img_june.select('DSI').rename('june_DSI'), 
                          s2img_june.select('DSWI1').rename('june_DSWI1'), 
                          s2img_june.select('DSWI2').rename('june_DSWI2'), 
                          s2img_june.select('DSWI3').rename('june_DSWI3'), 
                          s2img_june.select('DSWI4').rename('june_DSWI4'), 
                          s2img_june.select('DSWI5').rename('june_DSWI5'), 
                          s2img_june.select('DVI').rename('june_DVI'), 
                          s2img_june.select('EVI').rename('june_EVI'), 
                          s2img_june.select('EVI2').rename('june_EVI2'), 
                          s2img_june.select('ExG').rename('june_ExG'), 
                          s2img_june.select('ExGR').rename('june_ExGR'), 
                          s2img_june.select('ExR').rename('june_ExR'), 
                          s2img_june.select('FCVI').rename('june_FCVI'), 
                          s2img_june.select('GARI').rename('june_GARI'), 
                          s2img_june.select('GBNDVI').rename('june_GBNDVI'), 
                          s2img_june.select('GCC').rename('june_GCC'), 
                          s2img_june.select('GEMI').rename('june_GEMI'), 
                          s2img_june.select('GLI').rename('june_GLI'), 
                          s2img_june.select('GM1').rename('june_GM1'), 
                          s2img_june.select('GM2').rename('june_GM2'), 
                          s2img_june.select('GNDVI').rename('june_GNDVI'), 
                          s2img_june.select('GOSAVI').rename('june_GOSAVI'), 
                          s2img_june.select('GRNDVI').rename('june_GRNDVI'), 
                          s2img_june.select('GRVI').rename('june_GRVI'), 
                          s2img_june.select('GSAVI').rename('june_GSAVI'), 
                          s2img_june.select('GVMI').rename('june_GVMI'), 
                          s2img_june.select('IKAW').rename('june_IKAW'), 
                          s2img_june.select('IPVI').rename('june_IPVI'), 
                          s2img_june.select('IRECI').rename('june_IRECI'), 
                          s2img_june.select('MCARI').rename('june_MCARI'), 
                          s2img_june.select('MCARI1').rename('june_MCARI1'), 
                          s2img_june.select('MCARI2').rename('june_MCARI2'), 
                          s2img_june.select('MCARI705').rename('june_MCARI705'),
                          s2img_june.select('MCARIOSAVI').rename('june_MCARIOSAVI'),
                          s2img_june.select('MCARIOSAVI705').rename('june_MCARIOSAVI705'), 
                          s2img_june.select('MGRVI').rename('june_MGRVI'), 
                          s2img_june.select('MNDVI').rename('june_MNDVI'), 
                          s2img_june.select('MNLI').rename('june_MNLI'), 
                          s2img_june.select('MRBVI').rename('june_MRBVI'), 
                          s2img_june.select('MSAVI').rename('june_MSAVI'), 
                          s2img_june.select('MSI').rename('june_MSI'), 
                          s2img_june.select('MSR').rename('june_MSR'), 
                          s2img_june.select('MSR705').rename('june_MSR705'), 
                          s2img_june.select('MTCI').rename('june_MTCI'), 
                          s2img_june.select('MTVI1').rename('june_MTVI1'), 
                          s2img_june.select('MTVI2').rename('june_MTVI2'), 
                          s2img_june.select('ND705').rename('june_ND705'), 
                          s2img_june.select('NDDI').rename('june_NDDI'), 
                          s2img_june.select('NDII').rename('june_NDII'), 
                          s2img_june.select('NDMI').rename('june_NDMI'), 
                          s2img_june.select('NDREI').rename('june_NDREI'), 
                          s2img_june.select('NDVI').rename('june_NDVI'), 
                          s2img_june.select('NDVI705').rename('june_NDVI705'), 
                          s2img_june.select('NDYI').rename('june_NDYI'), 
                          s2img_june.select('NGRDI').rename('june_NGRDI'), 
                          s2img_june.select('NIRv').rename('june_NIRv'), 
                          s2img_june.select('NLI').rename('june_NLI'), 
                          s2img_june.select('NMDI').rename('june_NMDI'), 
                          s2img_june.select('NRFIg').rename('june_NRFIg'), 
                          s2img_june.select('NRFIr').rename('june_NRFIr'), 
                          s2img_june.select('NormG').rename('june_NormG'), 
                          s2img_june.select('NormNIR').rename('june_NormNIR'), 
                          s2img_june.select('NormR').rename('june_NormR'), 
                          s2img_june.select('OSAVI').rename('june_OSAVI'), 
                          s2img_june.select('PSRI').rename('june_PSRI'), 
                          s2img_june.select('RCC').rename('june_RCC'), 
                          s2img_june.select('RDVI').rename('june_RDVI'), 
                          s2img_june.select('REDSI').rename('june_REDSI'), 
                          s2img_june.select('RENDVI').rename('june_RENDVI'), 
                          s2img_june.select('RGBVI').rename('june_RGBVI'), 
                          s2img_june.select('RGRI').rename('june_RGRI'), 
                          s2img_june.select('RI').rename('june_RI'), 
                          s2img_june.select('RVI').rename('june_RVI'), 
                          s2img_june.select('S2REP').rename('june_S2REP'), 
                          s2img_june.select('SARVI').rename('june_SARVI'), 
                          s2img_june.select('SAVI').rename('june_SAVI'), 
                          s2img_june.select('SI').rename('june_SI'), 
                          s2img_june.select('SIPI').rename('june_SIPI'), 
                          s2img_june.select('SLAVI').rename('june_SLAVI'), 
                          s2img_june.select('SR').rename('june_SR'), 
                          s2img_june.select('SR2').rename('june_SR2'), 
                          s2img_june.select('SR3').rename('june_SR3'), 
                          s2img_june.select('SR555').rename('june_SR555'), 
                          s2img_june.select('SR705').rename('june_SR705'), 
                          s2img_june.select('SeLI').rename('june_SeLI'), 
                          s2img_june.select('TCARI').rename('june_TCARI'),
                          s2img_june.select('TCARIOSAVI').rename('june_TCARIOSAVI'),
                          s2img_june.select('TCARIOSAVI705').rename('june_TCARIOSAVI705'), 
                          s2img_june.select('TCI').rename('june_TCI'), 
                          s2img_june.select('TDVI').rename('june_TDVI'), 
                          s2img_june.select('TGI').rename('june_TGI'), 
                          s2img_june.select('TRRVI').rename('june_TRRVI'), 
                          s2img_june.select('TTVI').rename('june_TTVI'), 
                          s2img_june.select('TVI').rename('june_TVI'), 
                          s2img_june.select('TriVI').rename('june_TriVI'), 
                          s2img_june.select('VARI').rename('june_VARI'), 
                          s2img_june.select('VARI700').rename('june_VARI700'), 
                          s2img_june.select('VI700').rename('june_VI700'), 
                          s2img_june.select('VIG').rename('june_VIG'), 
                          s2img_june.select('WDRVI').rename('june_WDRVI'), 
                          s2img_june.select('mND705').rename('june_mND705'), 
                          s2img_june.select('mSR705').rename('june_mSR705'), 
                          s2img_june.select('BI').rename('june_BI'), 
                          s2img_june.select('BITM').rename('june_BITM'), 
                          s2img_june.select('BIXS').rename('june_BIXS'), 
                          s2img_june.select('BaI').rename('june_BaI'), 
                          s2img_june.select('DBSI').rename('june_DBSI'), 
                          s2img_june.select('EMBI').rename('june_EMBI'), 
                          s2img_june.select('MBI').rename('june_MBI'), 
                          s2img_june.select('NDSoI').rename('june_NDSoI'), 
                          s2img_june.select('NSDS').rename('june_NSDS'), 
                          s2img_june.select('NSDSI1').rename('june_NSDSI1'), 
                          s2img_june.select('NSDSI2').rename('june_NSDSI2'), 
                          s2img_june.select('NSDSI3').rename('june_NSDSI3'), 
                          s2img_june.select('RI4XS').rename('june_RI4XS'), 
                          s2img_june.select('BLFEI').rename('june_BLFEI'), 
                          s2img_june.select('BRBA').rename('june_BRBA'), 
                          s2img_june.select('IBI').rename('june_IBI'), 
                          s2img_june.select('NBAI').rename('june_NBAI'), 
                          s2img_june.select('NDBI').rename('june_NDBI'), 
                          s2img_june.select('NHFD').rename('june_NHFD'), 
                          s2img_june.select('PISI').rename('june_PISI'), 
                          s2img_june.select('UI').rename('june_UI'), 
                          s2img_june.select('VIBI').rename('june_VIBI'), 
                          s2img_june.select('VgNIRBI').rename('june_VgNIRBI'), 
                          s2img_june.select('VrNIRBI').rename('june_VrNIRBI'), 
                          s2img_june.select('ANDWI').rename('june_ANDWI'), 
                          s2img_june.select('AWEInsh').rename('june_AWEInsh'), 
                          s2img_june.select('AWEIsh').rename('june_AWEIsh'), 
                          s2img_june.select('LSWI').rename('june_LSWI'), 
                          s2img_june.select('MBWI').rename('june_MBWI'), 
                          s2img_june.select('MLSWI26').rename('june_MLSWI26'), 
                          s2img_june.select('MLSWI27').rename('june_MLSWI27'), 
                          s2img_june.select('MNDWI').rename('june_MNDWI'), 
                          s2img_june.select('MuWIR').rename('june_MuWIR'), 
                          s2img_june.select('NDCI').rename('june_NDCI'), 
                          s2img_june.select('NDPonI').rename('june_NDPonI'), 
                          s2img_june.select('NDTI').rename('june_NDTI'),
                          s2img_june.select('NDVIMNDWI').rename('june_NDVIMNDWI'), 
                          s2img_june.select('NDWI').rename('june_NDWI'), 
                          s2img_june.select('NWI').rename('june_NWI'), 
                          s2img_june.select('S2WI').rename('june_S2WI'), 
                          s2img_june.select('SWM').rename('june_SWM'), 
                          s2img_june.select('TWI').rename('june_TWI'), 
                          s2img_june.select('WI1').rename('june_WI1'), 
                          s2img_june.select('WI2').rename('june_WI2'), 
                          s2img_june.select('WI2015').rename('june_WI2015'), 
                          s2img_june.select('WRI').rename('june_WRI'), 

                          s2img_july.select('july_B1'), 
                          s2img_july.select('july_B2'), 
                          s2img_july.select('july_B3'), 
                          s2img_july.select('july_B4'), 
                          s2img_july.select('july_B5'), 
                          s2img_july.select('july_B6'), 
                          s2img_july.select('july_B7'), 
                          s2img_july.select('july_B8'), 
                          s2img_july.select('july_B8A'), 
                          s2img_july.select('july_B9'), 
                          s2img_july.select('july_B11'), 
                          s2img_july.select('july_B12'), 
                          s2img_july.select('AFRI1600').rename('july_AFRI1600'), 
                          s2img_july.select('AFRI2100').rename('july_AFRI2100'), 
                          s2img_july.select('ARI').rename('july_ARI'), 
                          s2img_july.select('ARI2').rename('july_ARI2'), 
                          s2img_july.select('ARVI').rename('july_ARVI'), 
                          s2img_july.select('AVI').rename('july_AVI'), 
                          s2img_july.select('BCC').rename('july_BCC'), 
                          s2img_july.select('BNDVI').rename('july_BNDVI'), 
                          s2img_july.select('BWDRVI').rename('july_BWDRVI'), 
                          s2img_july.select('CIG').rename('july_CIG'), 
                          s2img_july.select('CIRE').rename('july_CIRE'), 
                          s2img_july.select('CVI').rename('july_CVI'), 
                          s2img_july.select('DSI').rename('july_DSI'), 
                          s2img_july.select('DSWI1').rename('july_DSWI1'), 
                          s2img_july.select('DSWI2').rename('july_DSWI2'), 
                          s2img_july.select('DSWI3').rename('july_DSWI3'), 
                          s2img_july.select('DSWI4').rename('july_DSWI4'), 
                          s2img_july.select('DSWI5').rename('july_DSWI5'), 
                          s2img_july.select('DVI').rename('july_DVI'), 
                          s2img_july.select('EVI').rename('july_EVI'), 
                          s2img_july.select('EVI2').rename('july_EVI2'), 
                          s2img_july.select('ExG').rename('july_ExG'), 
                          s2img_july.select('ExGR').rename('july_ExGR'), 
                          s2img_july.select('ExR').rename('july_ExR'), 
                          s2img_july.select('FCVI').rename('july_FCVI'), 
                          s2img_july.select('GARI').rename('july_GARI'), 
                          s2img_july.select('GBNDVI').rename('july_GBNDVI'), 
                          s2img_july.select('GCC').rename('july_GCC'), 
                          s2img_july.select('GEMI').rename('july_GEMI'), 
                          s2img_july.select('GLI').rename('july_GLI'), 
                          s2img_july.select('GM1').rename('july_GM1'), 
                          s2img_july.select('GM2').rename('july_GM2'), 
                          s2img_july.select('GNDVI').rename('july_GNDVI'), 
                          s2img_july.select('GOSAVI').rename('july_GOSAVI'), 
                          s2img_july.select('GRNDVI').rename('july_GRNDVI'), 
                          s2img_july.select('GRVI').rename('july_GRVI'), 
                          s2img_july.select('GSAVI').rename('july_GSAVI'), 
                          s2img_july.select('GVMI').rename('july_GVMI'), 
                          s2img_july.select('IKAW').rename('july_IKAW'), 
                          s2img_july.select('IPVI').rename('july_IPVI'), 
                          s2img_july.select('IRECI').rename('july_IRECI'), 
                          s2img_july.select('MCARI').rename('july_MCARI'), 
                          s2img_july.select('MCARI1').rename('july_MCARI1'), 
                          s2img_july.select('MCARI2').rename('july_MCARI2'), 
                          s2img_july.select('MCARI705').rename('july_MCARI705'),
                          s2img_july.select('MCARIOSAVI').rename('july_MCARIOSAVI'),
                          s2img_july.select('MCARIOSAVI705').rename('july_MCARIOSAVI705'), 
                          s2img_july.select('MGRVI').rename('july_MGRVI'), 
                          s2img_july.select('MNDVI').rename('july_MNDVI'), 
                          s2img_july.select('MNLI').rename('july_MNLI'), 
                          s2img_july.select('MRBVI').rename('july_MRBVI'), 
                          s2img_july.select('MSAVI').rename('july_MSAVI'), 
                          s2img_july.select('MSI').rename('july_MSI'), 
                          s2img_july.select('MSR').rename('july_MSR'), 
                          s2img_july.select('MSR705').rename('july_MSR705'), 
                          s2img_july.select('MTCI').rename('july_MTCI'), 
                          s2img_july.select('MTVI1').rename('july_MTVI1'), 
                          s2img_july.select('MTVI2').rename('july_MTVI2'), 
                          s2img_july.select('ND705').rename('july_ND705'), 
                          s2img_july.select('NDDI').rename('july_NDDI'), 
                          s2img_july.select('NDII').rename('july_NDII'), 
                          s2img_july.select('NDMI').rename('july_NDMI'), 
                          s2img_july.select('NDREI').rename('july_NDREI'), 
                          s2img_july.select('NDVI').rename('july_NDVI'), 
                          s2img_july.select('NDVI705').rename('july_NDVI705'), 
                          s2img_july.select('NDYI').rename('july_NDYI'), 
                          s2img_july.select('NGRDI').rename('july_NGRDI'), 
                          s2img_july.select('NIRv').rename('july_NIRv'), 
                          s2img_july.select('NLI').rename('july_NLI'), 
                          s2img_july.select('NMDI').rename('july_NMDI'), 
                          s2img_july.select('NRFIg').rename('july_NRFIg'), 
                          s2img_july.select('NRFIr').rename('july_NRFIr'), 
                          s2img_july.select('NormG').rename('july_NormG'), 
                          s2img_july.select('NormNIR').rename('july_NormNIR'), 
                          s2img_july.select('NormR').rename('july_NormR'), 
                          s2img_july.select('OSAVI').rename('july_OSAVI'), 
                          s2img_july.select('PSRI').rename('july_PSRI'), 
                          s2img_july.select('RCC').rename('july_RCC'), 
                          s2img_july.select('RDVI').rename('july_RDVI'), 
                          s2img_july.select('REDSI').rename('july_REDSI'), 
                          s2img_july.select('RENDVI').rename('july_RENDVI'), 
                          s2img_july.select('RGBVI').rename('july_RGBVI'), 
                          s2img_july.select('RGRI').rename('july_RGRI'), 
                          s2img_july.select('RI').rename('july_RI'), 
                          s2img_july.select('RVI').rename('july_RVI'), 
                          s2img_july.select('S2REP').rename('july_S2REP'), 
                          s2img_july.select('SARVI').rename('july_SARVI'), 
                          s2img_july.select('SAVI').rename('july_SAVI'), 
                          s2img_july.select('SI').rename('july_SI'), 
                          s2img_july.select('SIPI').rename('july_SIPI'), 
                          s2img_july.select('SLAVI').rename('july_SLAVI'), 
                          s2img_july.select('SR').rename('july_SR'), 
                          s2img_july.select('SR2').rename('july_SR2'), 
                          s2img_july.select('SR3').rename('july_SR3'), 
                          s2img_july.select('SR555').rename('july_SR555'), 
                          s2img_july.select('SR705').rename('july_SR705'), 
                          s2img_july.select('SeLI').rename('july_SeLI'), 
                          s2img_july.select('TCARI').rename('july_TCARI'), 
                          s2img_july.select('TCARIOSAVI').rename('july_TCARIOSAVI'),
                          s2img_july.select('TCARIOSAVI705').rename('july_TCARIOSAVI705'), 
                          s2img_july.select('TCI').rename('july_TCI'), 
                          s2img_july.select('TDVI').rename('july_TDVI'), 
                          s2img_july.select('TGI').rename('july_TGI'), 
                          s2img_july.select('TRRVI').rename('july_TRRVI'), 
                          s2img_july.select('TTVI').rename('july_TTVI'), 
                          s2img_july.select('TVI').rename('july_TVI'), 
                          s2img_july.select('TriVI').rename('july_TriVI'), 
                          s2img_july.select('VARI').rename('july_VARI'), 
                          s2img_july.select('VARI700').rename('july_VARI700'), 
                          s2img_july.select('VI700').rename('july_VI700'), 
                          s2img_july.select('VIG').rename('july_VIG'), 
                          s2img_july.select('WDRVI').rename('july_WDRVI'), 
                          s2img_july.select('mND705').rename('july_mND705'), 
                          s2img_july.select('mSR705').rename('july_mSR705'), 
                          s2img_july.select('BI').rename('july_BI'), 
                          s2img_july.select('BITM').rename('july_BITM'), 
                          s2img_july.select('BIXS').rename('july_BIXS'), 
                          s2img_july.select('BaI').rename('july_BaI'), 
                          s2img_july.select('DBSI').rename('july_DBSI'), 
                          s2img_july.select('EMBI').rename('july_EMBI'), 
                          s2img_july.select('MBI').rename('july_MBI'), 
                          s2img_july.select('NDSoI').rename('july_NDSoI'), 
                          s2img_july.select('NSDS').rename('july_NSDS'), 
                          s2img_july.select('NSDSI1').rename('july_NSDSI1'), 
                          s2img_july.select('NSDSI2').rename('july_NSDSI2'), 
                          s2img_july.select('NSDSI3').rename('july_NSDSI3'), 
                          s2img_july.select('RI4XS').rename('july_RI4XS'), 
                          s2img_july.select('BLFEI').rename('july_BLFEI'), 
                          s2img_july.select('BRBA').rename('july_BRBA'), 
                          s2img_july.select('IBI').rename('july_IBI'), 
                          s2img_july.select('NBAI').rename('july_NBAI'), 
                          s2img_july.select('NDBI').rename('july_NDBI'), 
                          s2img_july.select('NHFD').rename('july_NHFD'), 
                          s2img_july.select('PISI').rename('july_PISI'), 
                          s2img_july.select('UI').rename('july_UI'), 
                          s2img_july.select('VIBI').rename('july_VIBI'), 
                          s2img_july.select('VgNIRBI').rename('july_VgNIRBI'), 
                          s2img_july.select('VrNIRBI').rename('july_VrNIRBI'), 
                          s2img_july.select('ANDWI').rename('july_ANDWI'), 
                          s2img_july.select('AWEInsh').rename('july_AWEInsh'), 
                          s2img_july.select('AWEIsh').rename('july_AWEIsh'), 
                          s2img_july.select('LSWI').rename('july_LSWI'), 
                          s2img_july.select('MBWI').rename('july_MBWI'), 
                          s2img_july.select('MLSWI26').rename('july_MLSWI26'), 
                          s2img_july.select('MLSWI27').rename('july_MLSWI27'), 
                          s2img_july.select('MNDWI').rename('july_MNDWI'), 
                          s2img_july.select('MuWIR').rename('july_MuWIR'), 
                          s2img_july.select('NDCI').rename('july_NDCI'), 
                          s2img_july.select('NDPonI').rename('july_NDPonI'), 
                          s2img_july.select('NDTI').rename('july_NDTI'),
                          s2img_july.select('NDVIMNDWI').rename('july_NDVIMNDWI'), 
                          s2img_july.select('NDWI').rename('july_NDWI'), 
                          s2img_july.select('NWI').rename('july_NWI'), 
                          s2img_july.select('S2WI').rename('july_S2WI'), 
                          s2img_july.select('SWM').rename('july_SWM'), 
                          s2img_july.select('TWI').rename('july_TWI'), 
                          s2img_july.select('WI1').rename('july_WI1'), 
                          s2img_july.select('WI2').rename('july_WI2'), 
                          s2img_july.select('WI2015').rename('july_WI2015'), 
                          s2img_july.select('WRI').rename('july_WRI'), 

                          s2img_august.select('august_B1'), 
                          s2img_august.select('august_B2'), 
                          s2img_august.select('august_B3'), 
                          s2img_august.select('august_B4'), 
                          s2img_august.select('august_B5'), 
                          s2img_august.select('august_B6'), 
                          s2img_august.select('august_B7'), 
                          s2img_august.select('august_B8'), 
                          s2img_august.select('august_B8A'), 
                          s2img_august.select('august_B9'), 
                          s2img_august.select('august_B11'), 
                          s2img_august.select('august_B12'), 
                          s2img_august.select('AFRI1600').rename('august_AFRI1600'), 
                          s2img_august.select('AFRI2100').rename('august_AFRI2100'), 
                          s2img_august.select('ARI').rename('august_ARI'), 
                          s2img_august.select('ARI2').rename('august_ARI2'), 
                          s2img_august.select('ARVI').rename('august_ARVI'), 
                          s2img_august.select('AVI').rename('august_AVI'), 
                          s2img_august.select('BCC').rename('august_BCC'), 
                          s2img_august.select('BNDVI').rename('august_BNDVI'), 
                          s2img_august.select('BWDRVI').rename('august_BWDRVI'), 
                          s2img_august.select('CIG').rename('august_CIG'), 
                          s2img_august.select('CIRE').rename('august_CIRE'), 
                          s2img_august.select('CVI').rename('august_CVI'), 
                          s2img_august.select('DSI').rename('august_DSI'), 
                          s2img_august.select('DSWI1').rename('august_DSWI1'), 
                          s2img_august.select('DSWI2').rename('august_DSWI2'), 
                          s2img_august.select('DSWI3').rename('august_DSWI3'), 
                          s2img_august.select('DSWI4').rename('august_DSWI4'), 
                          s2img_august.select('DSWI5').rename('august_DSWI5'), 
                          s2img_august.select('DVI').rename('august_DVI'), 
                          s2img_august.select('EVI').rename('august_EVI'), 
                          s2img_august.select('EVI2').rename('august_EVI2'), 
                          s2img_august.select('ExG').rename('august_ExG'), 
                          s2img_august.select('ExGR').rename('august_ExGR'), 
                          s2img_august.select('ExR').rename('august_ExR'), 
                          s2img_august.select('FCVI').rename('august_FCVI'), 
                          s2img_august.select('GARI').rename('august_GARI'), 
                          s2img_august.select('GBNDVI').rename('august_GBNDVI'), 
                          s2img_august.select('GCC').rename('august_GCC'), 
                          s2img_august.select('GEMI').rename('august_GEMI'), 
                          s2img_august.select('GLI').rename('august_GLI'), 
                          s2img_august.select('GM1').rename('august_GM1'), 
                          s2img_august.select('GM2').rename('august_GM2'), 
                          s2img_august.select('GNDVI').rename('august_GNDVI'), 
                          s2img_august.select('GOSAVI').rename('august_GOSAVI'), 
                          s2img_august.select('GRNDVI').rename('august_GRNDVI'), 
                          s2img_august.select('GRVI').rename('august_GRVI'), 
                          s2img_august.select('GSAVI').rename('august_GSAVI'), 
                          s2img_august.select('GVMI').rename('august_GVMI'), 
                          s2img_august.select('IKAW').rename('august_IKAW'), 
                          s2img_august.select('IPVI').rename('august_IPVI'), 
                          s2img_august.select('IRECI').rename('august_IRECI'), 
                          s2img_august.select('MCARI').rename('august_MCARI'), 
                          s2img_august.select('MCARI1').rename('august_MCARI1'), 
                          s2img_august.select('MCARI2').rename('august_MCARI2'), 
                          s2img_august.select('MCARI705').rename('august_MCARI705'),
                          s2img_august.select('MCARIOSAVI').rename('august_MCARIOSAVI'),
                          s2img_august.select('MCARIOSAVI705').rename('august_MCARIOSAVI705'), 
                          s2img_august.select('MGRVI').rename('august_MGRVI'), 
                          s2img_august.select('MNDVI').rename('august_MNDVI'), 
                          s2img_august.select('MNLI').rename('august_MNLI'), 
                          s2img_august.select('MRBVI').rename('august_MRBVI'), 
                          s2img_august.select('MSAVI').rename('august_MSAVI'), 
                          s2img_august.select('MSI').rename('august_MSI'), 
                          s2img_august.select('MSR').rename('august_MSR'), 
                          s2img_august.select('MSR705').rename('august_MSR705'), 
                          s2img_august.select('MTCI').rename('august_MTCI'), 
                          s2img_august.select('MTVI1').rename('august_MTVI1'), 
                          s2img_august.select('MTVI2').rename('august_MTVI2'), 
                          s2img_august.select('ND705').rename('august_ND705'), 
                          s2img_august.select('NDDI').rename('august_NDDI'), 
                          s2img_august.select('NDII').rename('august_NDII'), 
                          s2img_august.select('NDMI').rename('august_NDMI'), 
                          s2img_august.select('NDREI').rename('august_NDREI'), 
                          s2img_august.select('NDVI').rename('august_NDVI'), 
                          s2img_august.select('NDVI705').rename('august_NDVI705'), 
                          s2img_august.select('NDYI').rename('august_NDYI'), 
                          s2img_august.select('NGRDI').rename('august_NGRDI'), 
                          s2img_august.select('NIRv').rename('august_NIRv'), 
                          s2img_august.select('NLI').rename('august_NLI'), 
                          s2img_august.select('NMDI').rename('august_NMDI'), 
                          s2img_august.select('NRFIg').rename('august_NRFIg'), 
                          s2img_august.select('NRFIr').rename('august_NRFIr'), 
                          s2img_august.select('NormG').rename('august_NormG'), 
                          s2img_august.select('NormNIR').rename('august_NormNIR'), 
                          s2img_august.select('NormR').rename('august_NormR'), 
                          s2img_august.select('OSAVI').rename('august_OSAVI'), 
                          s2img_august.select('PSRI').rename('august_PSRI'), 
                          s2img_august.select('RCC').rename('august_RCC'), 
                          s2img_august.select('RDVI').rename('august_RDVI'), 
                          s2img_august.select('REDSI').rename('august_REDSI'), 
                          s2img_august.select('RENDVI').rename('august_RENDVI'), 
                          s2img_august.select('RGBVI').rename('august_RGBVI'), 
                          s2img_august.select('RGRI').rename('august_RGRI'), 
                          s2img_august.select('RI').rename('august_RI'), 
                          s2img_august.select('RVI').rename('august_RVI'), 
                          s2img_august.select('S2REP').rename('august_S2REP'), 
                          s2img_august.select('SARVI').rename('august_SARVI'), 
                          s2img_august.select('SAVI').rename('august_SAVI'), 
                          s2img_august.select('SI').rename('august_SI'), 
                          s2img_august.select('SIPI').rename('august_SIPI'), 
                          s2img_august.select('SLAVI').rename('august_SLAVI'), 
                          s2img_august.select('SR').rename('august_SR'), 
                          s2img_august.select('SR2').rename('august_SR2'), 
                          s2img_august.select('SR3').rename('august_SR3'), 
                          s2img_august.select('SR555').rename('august_SR555'), 
                          s2img_august.select('SR705').rename('august_SR705'), 
                          s2img_august.select('SeLI').rename('august_SeLI'), 
                          s2img_august.select('TCARI').rename('august_TCARI'),
                          s2img_august.select('TCARIOSAVI').rename('august_TCARIOSAVI'),
                          s2img_august.select('TCARIOSAVI705').rename('august_TCARIOSAVI705'), 
                          s2img_august.select('TCI').rename('august_TCI'), 
                          s2img_august.select('TDVI').rename('august_TDVI'), 
                          s2img_august.select('TGI').rename('august_TGI'), 
                          s2img_august.select('TRRVI').rename('august_TRRVI'), 
                          s2img_august.select('TTVI').rename('august_TTVI'), 
                          s2img_august.select('TVI').rename('august_TVI'), 
                          s2img_august.select('TriVI').rename('august_TriVI'), 
                          s2img_august.select('VARI').rename('august_VARI'), 
                          s2img_august.select('VARI700').rename('august_VARI700'), 
                          s2img_august.select('VI700').rename('august_VI700'), 
                          s2img_august.select('VIG').rename('august_VIG'), 
                          s2img_august.select('WDRVI').rename('august_WDRVI'), 
                          s2img_august.select('mND705').rename('august_mND705'), 
                          s2img_august.select('mSR705').rename('august_mSR705'), 
                          s2img_august.select('BI').rename('august_BI'), 
                          s2img_august.select('BITM').rename('august_BITM'), 
                          s2img_august.select('BIXS').rename('august_BIXS'), 
                          s2img_august.select('BaI').rename('august_BaI'), 
                          s2img_august.select('DBSI').rename('august_DBSI'), 
                          s2img_august.select('EMBI').rename('august_EMBI'), 
                          s2img_august.select('MBI').rename('august_MBI'), 
                          s2img_august.select('NDSoI').rename('august_NDSoI'), 
                          s2img_august.select('NSDS').rename('august_NSDS'), 
                          s2img_august.select('NSDSI1').rename('august_NSDSI1'), 
                          s2img_august.select('NSDSI2').rename('august_NSDSI2'), 
                          s2img_august.select('NSDSI3').rename('august_NSDSI3'), 
                          s2img_august.select('RI4XS').rename('august_RI4XS'), 
                          s2img_august.select('BLFEI').rename('august_BLFEI'), 
                          s2img_august.select('BRBA').rename('august_BRBA'), 
                          s2img_august.select('IBI').rename('august_IBI'), 
                          s2img_august.select('NBAI').rename('august_NBAI'), 
                          s2img_august.select('NDBI').rename('august_NDBI'), 
                          s2img_august.select('NHFD').rename('august_NHFD'), 
                          s2img_august.select('PISI').rename('august_PISI'), 
                          s2img_august.select('UI').rename('august_UI'), 
                          s2img_august.select('VIBI').rename('august_VIBI'), 
                          s2img_august.select('VgNIRBI').rename('august_VgNIRBI'), 
                          s2img_august.select('VrNIRBI').rename('august_VrNIRBI'), 
                          s2img_august.select('ANDWI').rename('august_ANDWI'), 
                          s2img_august.select('AWEInsh').rename('august_AWEInsh'), 
                          s2img_august.select('AWEIsh').rename('august_AWEIsh'), 
                          s2img_august.select('LSWI').rename('august_LSWI'), 
                          s2img_august.select('MBWI').rename('august_MBWI'), 
                          s2img_august.select('MLSWI26').rename('august_MLSWI26'), 
                          s2img_august.select('MLSWI27').rename('august_MLSWI27'), 
                          s2img_august.select('MNDWI').rename('august_MNDWI'), 
                          s2img_august.select('MuWIR').rename('august_MuWIR'), 
                          s2img_august.select('NDCI').rename('august_NDCI'), 
                          s2img_august.select('NDPonI').rename('august_NDPonI'), 
                          s2img_august.select('NDTI').rename('august_NDTI'),
                          s2img_august.select('NDVIMNDWI').rename('august_NDVIMNDWI'), 
                          s2img_august.select('NDWI').rename('august_NDWI'), 
                          s2img_august.select('NWI').rename('august_NWI'), 
                          s2img_august.select('S2WI').rename('august_S2WI'), 
                          s2img_august.select('SWM').rename('august_SWM'), 
                          s2img_august.select('TWI').rename('august_TWI'), 
                          s2img_august.select('WI1').rename('august_WI1'), 
                          s2img_august.select('WI2').rename('august_WI2'), 
                          s2img_august.select('WI2015').rename('august_WI2015'), 
                          s2img_august.select('WRI').rename('august_WRI'), 

                          s2img_september.select('september_B1'), 
                          s2img_september.select('september_B2'), 
                          s2img_september.select('september_B3'), 
                          s2img_september.select('september_B4'), 
                          s2img_september.select('september_B5'), 
                          s2img_september.select('september_B6'), 
                          s2img_september.select('september_B7'), 
                          s2img_september.select('september_B8'), 
                          s2img_september.select('september_B8A'), 
                          s2img_september.select('september_B9'), 
                          s2img_september.select('september_B11'), 
                          s2img_september.select('september_B12'),
                          s2img_september.select('AFRI1600').rename('september_AFRI1600'),
                          s2img_september.select('AFRI2100').rename('september_AFRI2100'), 
                          s2img_september.select('ARI').rename('september_ARI'), 
                          s2img_september.select('ARI2').rename('september_ARI2'), 
                          s2img_september.select('ARVI').rename('september_ARVI'), 
                          s2img_september.select('AVI').rename('september_AVI'), 
                          s2img_september.select('BCC').rename('september_BCC'), 
                          s2img_september.select('BNDVI').rename('september_BNDVI'),
                          s2img_september.select('BWDRVI').rename('september_BWDRVI'), 
                          s2img_september.select('CIG').rename('september_CIG'), 
                          s2img_september.select('CIRE').rename('september_CIRE'), 
                          s2img_september.select('CVI').rename('september_CVI'), 
                          s2img_september.select('DSI').rename('september_DSI'), 
                          s2img_september.select('DSWI1').rename('september_DSWI1'), 
                          s2img_september.select('DSWI2').rename('september_DSWI2'), 
                          s2img_september.select('DSWI3').rename('september_DSWI3'), 
                          s2img_september.select('DSWI4').rename('september_DSWI4'), 
                          s2img_september.select('DSWI5').rename('september_DSWI5'), 
                          s2img_september.select('DVI').rename('september_DVI'), 
                          s2img_september.select('EVI').rename('september_EVI'), 
                          s2img_september.select('EVI2').rename('september_EVI2'), 
                          s2img_september.select('ExG').rename('september_ExG'), 
                          s2img_september.select('ExGR').rename('september_ExGR'), 
                          s2img_september.select('ExR').rename('september_ExR'), 
                          s2img_september.select('FCVI').rename('september_FCVI'), 
                          s2img_september.select('GARI').rename('september_GARI'),
                          s2img_september.select('GBNDVI').rename('september_GBNDVI'), 
                          s2img_september.select('GCC').rename('september_GCC'), 
                          s2img_september.select('GEMI').rename('september_GEMI'), 
                          s2img_september.select('GLI').rename('september_GLI'), 
                          s2img_september.select('GM1').rename('september_GM1'), 
                          s2img_september.select('GM2').rename('september_GM2'), 
                          s2img_september.select('GNDVI').rename('september_GNDVI'),
                          s2img_september.select('GOSAVI').rename('september_GOSAVI'),
                          s2img_september.select('GRNDVI').rename('september_GRNDVI'), 
                          s2img_september.select('GRVI').rename('september_GRVI'), 
                          s2img_september.select('GSAVI').rename('september_GSAVI'), 
                          s2img_september.select('GVMI').rename('september_GVMI'), 
                          s2img_september.select('IKAW').rename('september_IKAW'), 
                          s2img_september.select('IPVI').rename('september_IPVI'), 
                          s2img_september.select('IRECI').rename('september_IRECI'), 
                          s2img_september.select('MCARI').rename('september_MCARI'),
                          s2img_september.select('MCARI1').rename('september_MCARI1'),
                          s2img_september.select('MCARI2').rename('september_MCARI2'),
                          s2img_september.select('MCARI705').rename('september_MCARI705'),
                          s2img_september.select('MCARIOSAVI').rename('september_MCARIOSAVI'),
                          s2img_september.select('MCARIOSAVI705').rename('september_MCARIOSAVI705'), 
                          s2img_september.select('MGRVI').rename('september_MGRVI'), 
                          s2img_september.select('MNDVI').rename('september_MNDVI'), 
                          s2img_september.select('MNLI').rename('september_MNLI'), 
                          s2img_september.select('MRBVI').rename('september_MRBVI'), 
                          s2img_september.select('MSAVI').rename('september_MSAVI'), 
                          s2img_september.select('MSI').rename('september_MSI'), 
                          s2img_september.select('MSR').rename('september_MSR'),
                          s2img_september.select('MSR705').rename('september_MSR705'), 
                          s2img_september.select('MTCI').rename('september_MTCI'), 
                          s2img_september.select('MTVI1').rename('september_MTVI1'), 
                          s2img_september.select('MTVI2').rename('september_MTVI2'), 
                          s2img_september.select('ND705').rename('september_ND705'), 
                          s2img_september.select('NDDI').rename('september_NDDI'), 
                          s2img_september.select('NDII').rename('september_NDII'), 
                          s2img_september.select('NDMI').rename('september_NDMI'), 
                          s2img_september.select('NDREI').rename('september_NDREI'), 
                          s2img_september.select('NDVI').rename('september_NDVI'),
                          s2img_september.select('NDVI705').rename('september_NDVI705'), 
                          s2img_september.select('NDYI').rename('september_NDYI'), 
                          s2img_september.select('NGRDI').rename('september_NGRDI'), 
                          s2img_september.select('NIRv').rename('september_NIRv'), 
                          s2img_september.select('NLI').rename('september_NLI'), 
                          s2img_september.select('NMDI').rename('september_NMDI'), 
                          s2img_september.select('NRFIg').rename('september_NRFIg'), 
                          s2img_september.select('NRFIr').rename('september_NRFIr'), 
                          s2img_september.select('NormG').rename('september_NormG'),
                          s2img_september.select('NormNIR').rename('september_NormNIR'), 
                          s2img_september.select('NormR').rename('september_NormR'), 
                          s2img_september.select('OSAVI').rename('september_OSAVI'), 
                          s2img_september.select('PSRI').rename('september_PSRI'), 
                          s2img_september.select('RCC').rename('september_RCC'), 
                          s2img_september.select('RDVI').rename('september_RDVI'), 
                          s2img_september.select('REDSI').rename('september_REDSI'),
                          s2img_september.select('RENDVI').rename('september_RENDVI'), 
                          s2img_september.select('RGBVI').rename('september_RGBVI'), 
                          s2img_september.select('RGRI').rename('september_RGRI'), 
                          s2img_september.select('RI').rename('september_RI'), 
                          s2img_september.select('RVI').rename('september_RVI'), 
                          s2img_september.select('S2REP').rename('september_S2REP'), 
                          s2img_september.select('SARVI').rename('september_SARVI'), 
                          s2img_september.select('SAVI').rename('september_SAVI'), 
                          s2img_september.select('SI').rename('september_SI'), 
                          s2img_september.select('SIPI').rename('september_SIPI'), 
                          s2img_september.select('SLAVI').rename('september_SLAVI'), 
                          s2img_september.select('SR').rename('september_SR'), 
                          s2img_september.select('SR2').rename('september_SR2'), 
                          s2img_september.select('SR3').rename('september_SR3'), 
                          s2img_september.select('SR555').rename('september_SR555'), 
                          s2img_september.select('SR705').rename('september_SR705'), 
                          s2img_september.select('SeLI').rename('september_SeLI'), 
                          s2img_september.select('TCARI').rename('september_TCARI'),
                          s2img_september.select('TCARIOSAVI').rename('september_TCARIOSAVI'),
                          s2img_september.select('TCARIOSAVI705').rename('september_TCARIOSAVI705'), 
                          s2img_september.select('TCI').rename('september_TCI'), 
                          s2img_september.select('TDVI').rename('september_TDVI'), 
                          s2img_september.select('TGI').rename('september_TGI'), 
                          s2img_september.select('TRRVI').rename('september_TRRVI'), 
                          s2img_september.select('TTVI').rename('september_TTVI'), 
                          s2img_september.select('TVI').rename('september_TVI'), 
                          s2img_september.select('TriVI').rename('september_TriVI'), 
                          s2img_september.select('VARI').rename('september_VARI'),
                          s2img_september.select('VARI700').rename('september_VARI700'), 
                          s2img_september.select('VI700').rename('september_VI700'), 
                          s2img_september.select('VIG').rename('september_VIG'), 
                          s2img_september.select('WDRVI').rename('september_WDRVI'),
                          s2img_september.select('mND705').rename('september_mND705'),
                          s2img_september.select('mSR705').rename('september_mSR705'), 
                          s2img_september.select('BI').rename('september_BI'), 
                          s2img_september.select('BITM').rename('september_BITM'), 
                          s2img_september.select('BIXS').rename('september_BIXS'), 
                          s2img_september.select('BaI').rename('september_BaI'), 
                          s2img_september.select('DBSI').rename('september_DBSI'), 
                          s2img_september.select('EMBI').rename('september_EMBI'), 
                          s2img_september.select('MBI').rename('september_MBI'), 
                          s2img_september.select('NDSoI').rename('september_NDSoI'), 
                          s2img_september.select('NSDS').rename('september_NSDS'), 
                          s2img_september.select('NSDSI1').rename('september_NSDSI1'), 
                          s2img_september.select('NSDSI2').rename('september_NSDSI2'), 
                          s2img_september.select('NSDSI3').rename('september_NSDSI3'), 
                          s2img_september.select('RI4XS').rename('september_RI4XS'), 
                          s2img_september.select('BLFEI').rename('september_BLFEI'), 
                          s2img_september.select('BRBA').rename('september_BRBA'), 
                          s2img_september.select('IBI').rename('september_IBI'), 
                          s2img_september.select('NBAI').rename('september_NBAI'), 
                          s2img_september.select('NDBI').rename('september_NDBI'), 
                          s2img_september.select('NHFD').rename('september_NHFD'), 
                          s2img_september.select('PISI').rename('september_PISI'), 
                          s2img_september.select('UI').rename('september_UI'), 
                          s2img_september.select('VIBI').rename('september_VIBI'),
                          s2img_september.select('VgNIRBI').rename('september_VgNIRBI'),
                          s2img_september.select('VrNIRBI').rename('september_VrNIRBI'), 
                          s2img_september.select('ANDWI').rename('september_ANDWI'),
                          s2img_september.select('AWEInsh').rename('september_AWEInsh'), 
                          s2img_september.select('AWEIsh').rename('september_AWEIsh'), 
                          s2img_september.select('LSWI').rename('september_LSWI'), 
                          s2img_september.select('MBWI').rename('september_MBWI'),
                          s2img_september.select('MLSWI26').rename('september_MLSWI26'),
                          s2img_september.select('MLSWI27').rename('september_MLSWI27'),
                          s2img_september.select('MNDWI').rename('september_MNDWI'), 
                          s2img_september.select('MuWIR').rename('september_MuWIR'), 
                          s2img_september.select('NDCI').rename('september_NDCI'), 
                          s2img_september.select('NDPonI').rename('september_NDPonI'), 
                          s2img_september.select('NDTI').rename('september_NDTI'),
                          s2img_september.select('NDVIMNDWI').rename('september_NDVIMNDWI'), 
                          s2img_september.select('NDWI').rename('september_NDWI'), 
                          s2img_september.select('NWI').rename('september_NWI'), 
                          s2img_september.select('S2WI').rename('september_S2WI'), 
                          s2img_september.select('SWM').rename('september_SWM'), 
                          s2img_september.select('TWI').rename('september_TWI'), 
                          s2img_september.select('WI1').rename('september_WI1'), 
                          s2img_september.select('WI2').rename('september_WI2'), 
                          s2img_september.select('WI2015').rename('september_WI2015'), 
                          s2img_september.select('WRI').rename('september_WRI'), 

                          s2img_october.select('october_B1'), 
                          s2img_october.select('october_B2'), 
                          s2img_october.select('october_B3'), 
                          s2img_october.select('october_B4'), 
                          s2img_october.select('october_B5'), 
                          s2img_october.select('october_B6'), 
                          s2img_october.select('october_B7'), 
                          s2img_october.select('october_B8'), 
                          s2img_october.select('october_B8A'), 
                          s2img_october.select('october_B9'), 
                          s2img_october.select('october_B11'), 
                          s2img_october.select('october_B12'), 
                          s2img_october.select('AFRI1600').rename('october_AFRI1600'), 
                          s2img_october.select('AFRI2100').rename('october_AFRI2100'), 
                          s2img_october.select('ARI').rename('october_ARI'), 
                          s2img_october.select('ARI2').rename('october_ARI2'), 
                          s2img_october.select('ARVI').rename('october_ARVI'), 
                          s2img_october.select('AVI').rename('october_AVI'), 
                          s2img_october.select('BCC').rename('october_BCC'), 
                          s2img_october.select('BNDVI').rename('october_BNDVI'), 
                          s2img_october.select('BWDRVI').rename('october_BWDRVI'), 
                          s2img_october.select('CIG').rename('october_CIG'), 
                          s2img_october.select('CIRE').rename('october_CIRE'), 
                          s2img_october.select('CVI').rename('october_CVI'), 
                          s2img_october.select('DSI').rename('october_DSI'), 
                          s2img_october.select('DSWI1').rename('october_DSWI1'), 
                          s2img_october.select('DSWI2').rename('october_DSWI2'), 
                          s2img_october.select('DSWI3').rename('october_DSWI3'), 
                          s2img_october.select('DSWI4').rename('october_DSWI4'), 
                          s2img_october.select('DSWI5').rename('october_DSWI5'), 
                          s2img_october.select('DVI').rename('october_DVI'), 
                          s2img_october.select('EVI').rename('october_EVI'), 
                          s2img_october.select('EVI2').rename('october_EVI2'), 
                          s2img_october.select('ExG').rename('october_ExG'), 
                          s2img_october.select('ExGR').rename('october_ExGR'), 
                          s2img_october.select('ExR').rename('october_ExR'), 
                          s2img_october.select('FCVI').rename('october_FCVI'), 
                          s2img_october.select('GARI').rename('october_GARI'), 
                          s2img_october.select('GBNDVI').rename('october_GBNDVI'), 
                          s2img_october.select('GCC').rename('october_GCC'), 
                          s2img_october.select('GEMI').rename('october_GEMI'), 
                          s2img_october.select('GLI').rename('october_GLI'), 
                          s2img_october.select('GM1').rename('october_GM1'), 
                          s2img_october.select('GM2').rename('october_GM2'), 
                          s2img_october.select('GNDVI').rename('october_GNDVI'), 
                          s2img_october.select('GOSAVI').rename('october_GOSAVI'), 
                          s2img_october.select('GRNDVI').rename('october_GRNDVI'), 
                          s2img_october.select('GRVI').rename('october_GRVI'), 
                          s2img_october.select('GSAVI').rename('october_GSAVI'), 
                          s2img_october.select('GVMI').rename('october_GVMI'), 
                          s2img_october.select('IKAW').rename('october_IKAW'), 
                          s2img_october.select('IPVI').rename('october_IPVI'), 
                          s2img_october.select('IRECI').rename('october_IRECI'), 
                          s2img_october.select('MCARI').rename('october_MCARI'), 
                          s2img_october.select('MCARI1').rename('october_MCARI1'), 
                          s2img_october.select('MCARI2').rename('october_MCARI2'),
                          s2img_october.select('MCARI705').rename('october_MCARI705'),
                          s2img_october.select('MCARIOSAVI').rename('october_MCARIOSAVI'),
                          s2img_october.select('MCARIOSAVI705').rename('october_MCARIOSAVI705'), 
                          s2img_october.select('MGRVI').rename('october_MGRVI'), 
                          s2img_october.select('MNDVI').rename('october_MNDVI'), 
                          s2img_october.select('MNLI').rename('october_MNLI'), 
                          s2img_october.select('MRBVI').rename('october_MRBVI'), 
                          s2img_october.select('MSAVI').rename('october_MSAVI'), 
                          s2img_october.select('MSI').rename('october_MSI'), 
                          s2img_october.select('MSR').rename('october_MSR'), 
                          s2img_october.select('MSR705').rename('october_MSR705'), 
                          s2img_october.select('MTCI').rename('october_MTCI'), 
                          s2img_october.select('MTVI1').rename('october_MTVI1'), 
                          s2img_october.select('MTVI2').rename('october_MTVI2'), 
                          s2img_october.select('ND705').rename('october_ND705'), 
                          s2img_october.select('NDDI').rename('october_NDDI'), 
                          s2img_october.select('NDII').rename('october_NDII'), 
                          s2img_october.select('NDMI').rename('october_NDMI'), 
                          s2img_october.select('NDREI').rename('october_NDREI'), 
                          s2img_october.select('NDVI').rename('october_NDVI'), 
                          s2img_october.select('NDVI705').rename('october_NDVI705'), 
                          s2img_october.select('NDYI').rename('october_NDYI'), 
                          s2img_october.select('NGRDI').rename('october_NGRDI'), 
                          s2img_october.select('NIRv').rename('october_NIRv'), 
                          s2img_october.select('NLI').rename('october_NLI'), 
                          s2img_october.select('NMDI').rename('october_NMDI'), 
                          s2img_october.select('NRFIg').rename('october_NRFIg'), 
                          s2img_october.select('NRFIr').rename('october_NRFIr'), 
                          s2img_october.select('NormG').rename('october_NormG'), 
                          s2img_october.select('NormNIR').rename('october_NormNIR'), 
                          s2img_october.select('NormR').rename('october_NormR'), 
                          s2img_october.select('OSAVI').rename('october_OSAVI'), 
                          s2img_october.select('PSRI').rename('october_PSRI'), 
                          s2img_october.select('RCC').rename('october_RCC'), 
                          s2img_october.select('RDVI').rename('october_RDVI'), 
                          s2img_october.select('REDSI').rename('october_REDSI'), 
                          s2img_october.select('RENDVI').rename('october_RENDVI'), 
                          s2img_october.select('RGBVI').rename('october_RGBVI'), 
                          s2img_october.select('RGRI').rename('october_RGRI'), 
                          s2img_october.select('RI').rename('october_RI'), 
                          s2img_october.select('RVI').rename('october_RVI'), 
                          s2img_october.select('S2REP').rename('october_S2REP'), 
                          s2img_october.select('SARVI').rename('october_SARVI'), 
                          s2img_october.select('SAVI').rename('october_SAVI'), 
                          s2img_october.select('SI').rename('october_SI'), 
                          s2img_october.select('SIPI').rename('october_SIPI'), 
                          s2img_october.select('SLAVI').rename('october_SLAVI'), 
                          s2img_october.select('SR').rename('october_SR'), 
                          s2img_october.select('SR2').rename('october_SR2'), 
                          s2img_october.select('SR3').rename('october_SR3'), 
                          s2img_october.select('SR555').rename('october_SR555'), 
                          s2img_october.select('SR705').rename('october_SR705'), 
                          s2img_october.select('SeLI').rename('october_SeLI'), 
                          s2img_october.select('TCARI').rename('october_TCARI'),
                          s2img_october.select('TCARIOSAVI').rename('october_TCARIOSAVI'),
                          s2img_october.select('TCARIOSAVI705').rename('october_TCARIOSAVI705'), 
                          s2img_october.select('TCI').rename('october_TCI'), 
                          s2img_october.select('TDVI').rename('october_TDVI'), 
                          s2img_october.select('TGI').rename('october_TGI'), 
                          s2img_october.select('TRRVI').rename('october_TRRVI'), 
                          s2img_october.select('TTVI').rename('october_TTVI'), 
                          s2img_october.select('TVI').rename('october_TVI'), 
                          s2img_october.select('TriVI').rename('october_TriVI'), 
                          s2img_october.select('VARI').rename('october_VARI'), 
                          s2img_october.select('VARI700').rename('october_VARI700'), 
                          s2img_october.select('VI700').rename('october_VI700'), 
                          s2img_october.select('VIG').rename('october_VIG'), 
                          s2img_october.select('WDRVI').rename('october_WDRVI'), 
                          s2img_october.select('mND705').rename('october_mND705'), 
                          s2img_october.select('mSR705').rename('october_mSR705'), 
                          s2img_october.select('BI').rename('october_BI'), 
                          s2img_october.select('BITM').rename('october_BITM'), 
                          s2img_october.select('BIXS').rename('october_BIXS'), 
                          s2img_october.select('BaI').rename('october_BaI'), 
                          s2img_october.select('DBSI').rename('october_DBSI'), 
                          s2img_october.select('EMBI').rename('october_EMBI'), 
                          s2img_october.select('MBI').rename('october_MBI'), 
                          s2img_october.select('NDSoI').rename('october_NDSoI'), 
                          s2img_october.select('NSDS').rename('october_NSDS'), 
                          s2img_october.select('NSDSI1').rename('october_NSDSI1'), 
                          s2img_october.select('NSDSI2').rename('october_NSDSI2'), 
                          s2img_october.select('NSDSI3').rename('october_NSDSI3'), 
                          s2img_october.select('RI4XS').rename('october_RI4XS'), 
                          s2img_october.select('BLFEI').rename('october_BLFEI'), 
                          s2img_october.select('BRBA').rename('october_BRBA'), 
                          s2img_october.select('IBI').rename('october_IBI'), 
                          s2img_october.select('NBAI').rename('october_NBAI'), 
                          s2img_october.select('NDBI').rename('october_NDBI'), 
                          s2img_october.select('NHFD').rename('october_NHFD'), 
                          s2img_october.select('PISI').rename('october_PISI'), 
                          s2img_october.select('UI').rename('october_UI'), 
                          s2img_october.select('VIBI').rename('october_VIBI'), 
                          s2img_october.select('VgNIRBI').rename('october_VgNIRBI'), 
                          s2img_october.select('VrNIRBI').rename('october_VrNIRBI'), 
                          s2img_october.select('ANDWI').rename('october_ANDWI'), 
                          s2img_october.select('AWEInsh').rename('october_AWEInsh'), 
                          s2img_october.select('AWEIsh').rename('october_AWEIsh'), 
                          s2img_october.select('LSWI').rename('october_LSWI'), 
                          s2img_october.select('MBWI').rename('october_MBWI'), 
                          s2img_october.select('MLSWI26').rename('october_MLSWI26'), 
                          s2img_october.select('MLSWI27').rename('october_MLSWI27'), 
                          s2img_october.select('MNDWI').rename('october_MNDWI'), 
                          s2img_october.select('MuWIR').rename('october_MuWIR'), 
                          s2img_october.select('NDCI').rename('october_NDCI'), 
                          s2img_october.select('NDPonI').rename('october_NDPonI'), 
                          s2img_october.select('NDTI').rename('october_NDTI'),
                          s2img_october.select('NDVIMNDWI').rename('october_NDVIMNDWI'), 
                          s2img_october.select('NDWI').rename('october_NDWI'), 
                          s2img_october.select('NWI').rename('october_NWI'), 
                          s2img_october.select('S2WI').rename('october_S2WI'), 
                          s2img_october.select('SWM').rename('october_SWM'), 
                          s2img_october.select('TWI').rename('october_TWI'), 
                          s2img_october.select('WI1').rename('october_WI1'), 
                          s2img_october.select('WI2').rename('october_WI2'), 
                          s2img_october.select('WI2015').rename('october_WI2015'), 
                          s2img_october.select('WRI').rename('october_WRI'), 

                          desc_may.select('DPDD').rename('may_DPDD'),
                          desc_may.select('DpRVIVV').rename('may_DpRVIVV'),
                          desc_may.select('NDPolI').rename('may_NDPolI'),
                          desc_may.select('VDDPI').rename('may_VDDPI'),
                          desc_may.select('VHVVD').rename('may_VHVVD'),
                          desc_may.select('VHVVP').rename('may_VHVVP'),
                          desc_may.select('VHVVR').rename('may_VHVVR'),
                          desc_may.select('VVVHD').rename('may_VVVHD'),
                          desc_may.select('VVVHR').rename('may_VVVHR'),
                          desc_may.select('VVVHS').rename('may_VVVHS'),
                          desc_vvmay.select('VV').rename('may_VV'),
                          desc_vhmay.select('VH').rename('may_VH'),
                          desc_vv2vhmay.select('VV2VH').rename('may_VV2VH'),
                          desc_vh2vvmay.select('VH2VV').rename('may_VH2VV'),
                          desc_june.select('DPDD').rename('june_DPDD'),
                          desc_june.select('DpRVIVV').rename('june_DpRVIVV'),
                          desc_june.select('NDPolI').rename('june_NDPolI'),
                          desc_june.select('VDDPI').rename('june_VDDPI'),
                          desc_june.select('VHVVD').rename('june_VHVVD'),
                          desc_june.select('VHVVP').rename('june_VHVVP'),
                          desc_june.select('VHVVR').rename('june_VHVVR'),
                          desc_june.select('VVVHD').rename('june_VVVHD'),
                          desc_june.select('VVVHR').rename('june_VVVHR'),
                          desc_june.select('VVVHS').rename('june_VVVHS'),
                          desc_vvjune.select('VV').rename('june_VV'),
                          desc_vhjune.select('VH').rename('june_VH'),
                          desc_vv2vhjune.select('VV2VH').rename('june_VV2VH'),
                          desc_vh2vvjune.select('VH2VV').rename('june_VH2VV'),
                          desc_july.select('DPDD').rename('july_DPDD'),
                          desc_july.select('DpRVIVV').rename('july_DpRVIVV'),
                          desc_july.select('NDPolI').rename('july_NDPolI'),
                          desc_july.select('VDDPI').rename('july_VDDPI'),
                          desc_july.select('VHVVD').rename('july_VHVVD'),
                          desc_july.select('VHVVP').rename('july_VHVVP'),
                          desc_july.select('VHVVR').rename('july_VHVVR'),
                          desc_july.select('VVVHD').rename('july_VVVHD'),
                          desc_july.select('VVVHR').rename('july_VVVHR'),
                          desc_july.select('VVVHS').rename('july_VVVHS'),
                          desc_vvjuly.select('VV').rename('july_VV'),
                          desc_vhjuly.select('VH').rename('july_VH'),
                          desc_vv2vhjuly.select('VV2VH').rename('july_VV2VH'),
                          desc_vh2vvjuly.select('VH2VV').rename('july_VH2VV'),
                          desc_august.select('DPDD').rename('august_DPDD'),
                          desc_august.select('DpRVIVV').rename('august_DpRVIVV'),
                          desc_august.select('NDPolI').rename('august_NDPolI'),
                          desc_august.select('VDDPI').rename('august_VDDPI'),
                          desc_august.select('VHVVD').rename('august_VHVVD'),
                          desc_august.select('VHVVP').rename('august_VHVVP'),
                          desc_august.select('VHVVR').rename('august_VHVVR'),
                          desc_august.select('VVVHD').rename('august_VVVHD'),
                          desc_august.select('VVVHR').rename('august_VVVHR'),
                          desc_august.select('VVVHS').rename('august_VVVHS'),
                          desc_vvaugust.select('VV').rename('august_VV'),
                          desc_vhaugust.select('VH').rename('august_VH'),
                          desc_vv2vhaugust.select('VV2VH').rename('august_VV2VH'),
                          desc_vh2vvaugust.select('VH2VV').rename('august_VH2VV'),
                          desc_september.select('DPDD').rename('september_DPDD'),
                          desc_september.select('DpRVIVV').rename('september_DpRVIVV'),
                          desc_september.select('NDPolI').rename('september_NDPolI'),
                          desc_september.select('VDDPI').rename('september_VDDPI'),
                          desc_september.select('VHVVD').rename('september_VHVVD'),
                          desc_september.select('VHVVP').rename('september_VHVVP'),
                          desc_september.select('VHVVR').rename('september_VHVVR'),
                          desc_september.select('VVVHD').rename('september_VVVHD'),
                          desc_september.select('VVVHR').rename('september_VVVHR'),
                          desc_september.select('VVVHS').rename('september_VVVHS'),
                          desc_vvseptember.select('VV').rename('september_VV'),
                          desc_vhseptember.select('VH').rename('september_VH'),
                          desc_vv2vhseptember.select('VV2VH').rename('september_VV2VH'),
                          desc_vh2vvseptember.select('VH2VV').rename('september_VH2VV'),
                          desc_october.select('DPDD').rename('october_DPDD'),
                          desc_october.select('DpRVIVV').rename('october_DpRVIVV'),
                          desc_october.select('NDPolI').rename('october_NDPolI'),
                          desc_october.select('VDDPI').rename('october_VDDPI'),
                          desc_october.select('VHVVD').rename('october_VHVVD'),
                          desc_october.select('VHVVP').rename('october_VHVVP'),
                          desc_october.select('VHVVR').rename('october_VHVVR'),
                          desc_october.select('VVVHD').rename('october_VVVHD'),
                          desc_october.select('VVVHR').rename('october_VVVHR'),
                          desc_october.select('VVVHS').rename('october_VVVHS'),
                          desc_vvoctober.select('VV').rename('october_VV'),
                          desc_vhoctober.select('VH').rename('october_VH'),
                          desc_vv2vhoctober.select('VV2VH').rename('october_VV2VH'),
                          desc_vh2vvoctober.select('VH2VV').rename('october_VH2VV'),
                          elevation_new.select('elevation_new'),
                          slope_new.select('slope_new'),
                          aspect_new.select('aspect_new'),
                          plan_curvature_new.select('plan_curvature_new'),
                          profile_curvature_new.select('profile_curvature_new'),
                          convergence_index_new.select('convergence_index_new'),
                          topographic_wetness_index_new.select('topographic_wetness_index_new'),
                          relative_slope_position_new.select('relative_slope_position_new')
]);
// print(construct_img,'construct_img')

//////////////////////////////////////////////////////////////////////////////////
// Synthesized images of bands used for classification after rfe screening
//////////////////////////////////////////////////////////////////////////////////
var construct_img2 = construct_img.select('SR','WDRVI','GBNDVI','VrNIRBI','MSR','september_NBAI',
                                                                     'GRNDVI','august_NBAI','june_NBAI','august_VgNIRBI','relative_slope_position_new','VgNIRBI',
                                                                     'NDVI','june_SR2','NormR','july_NLI','GNDVI','NBAI',
                                                                     'june_GRVI','IPVI','august_CIG','june_CIG','NormNIR','june_GNDVI',
                                                                     'CIG','NDWI','GOSAVI','GRVI','july_NBAI','NLI',
                                                                     'june_VgNIRBI','july_GRVI','october_NBAI','june_VVVHS','june_NDWI','july_CVI',
                                                                     'june_NormG','august_GRVI','july_B8','aspect_new','august_NormG','july_NormG',
                                                                     'june_GRNDVI','july_GNDVI','slope_new','june_SR','june_NLI','june_VV2VH',
                                                                     'june_VH2VV','june_NormNIR','june_B8','august_GOSAVI','june_IPVI','august_NDWI',
                                                                     'june_DPDD','august_GSAVI','june_MSR','june_VHVVP','august_SR2','august_MSR',
                                                                     'july_GEMI','july_GCC','august_GRNDVI','august_SR','october_GRNDVI','june_GBNDVI',
                                                                     'october_VVVHS','august_NormNIR','july_BLFEI','august_GNDVI','september_B4','elevation_new',
                                                                     'september_VrNIRBI','june_GSAVI','july_CIG','GSAVI','may_VV2VH','august_VrNIRBI',
                                                                     'october_VV2VH','topographic_wetness_index_new','september_RVI','july_B4','august_GLI','BNDVI',
                                                                     'september_B8','october_VgNIRBI','july_GLI','october_GNDVI','GLI','august_VV2VH',
                                                                     'july_ExG','june_RGBVI','july_NDYI','SR2','july_BIXS','july_VARI700',
                                                                     'october_CIG','july_ExGR','september_VV2VH','may_VVVHS','september_SR','july_RGBVI',
                                                                     'september_WRI','june_GLI','september_BLFEI','october_DPDD','october_CVI','october_GRVI',
                                                                     'august_RGBVI','october_SR2','TGI','october_VHVVP','june_VrNIRBI','october_NormG',
                                                                     'august_VHVVP','september_DPDD','october_NDWI','DSWI4','NGRDI','august_GCC',
                                                                     'september_TRRVI','october_TGI','october_FCVI','october_GOSAVI','september_VHVVP','july_TRRVI',
                                                                     'october_VH2VV','RGBVI','october_VH','july_RVI','july_SR555','september_CVI',
                                                                     'september_VVVHS','september_VH','july_TGI','october_NLI','MGRVI','september_BITM',
                                                                     'october_RGBVI','september_BRBA','june_GCC','september_DSWI3','july_BITM','may_DPDD',
                                                                     'profile_curvature_new','RGRI','september_VH2VV','july_B3','plan_curvature_new','august_B4',
                                                                     'july_AWEInsh','may_B4','july_GM1','october_VIG','september_PSRI','BIXS',
                                                                     'GCC','june_VH','july_DBSI','may_B5','NMDI','ExG',
                                                                     'september_B2','BITM','june_TRRVI','september_BIXS','october_GSAVI','july_GARI',
                                                                     'june_B4','MBI','september_GARI','june_RDVI','october_TTVI','RI',
                                                                     'may_B8','july_TCARIOSAVI705','june_NormR','june_B6');
// print(construct_img2,'construct_img2')

/////////////////////////////////////////////////////////////////
//////////////////     set training data    ///////////////////////
/////////////////////////////////////////////////////////////////
// Crop, forest, grass, impervious, water, wetland and peatland are their respective corresponding sample points
var train_points = crop.merge(forest).merge(grass).merge(impervious).merge(water).merge(wetland).merge(peatland);
// print(train_points,'train_points');
var train_data= construct_img2.sampleRegions({
  collection: train_points,
  properties: ['landcover'],
  scale: 10,
  tileScale:16,
  geometries:true
});
// print(train_data,'train_data')
// Map.addLayer(train_data,{},'train_data')

/////////////////////////////////////////////////////////////////////////////////
//////////////////     Multi-Source Feature Stacking    ///////////////////////
/////////////////////////////////////////////////////////////////////////////////
 
var EO_Stack = ee.Image.cat(construct_img2);
print(EO_Stack,'EO_Stack');
 
// /////////////////////////////////////////////////////////////////////////////////
// /////////////////////////     OBIA Segmentation    ////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////
 
// Segmentation processing.
var seeds = ee.Algorithms.Image.Segmentation.seedGrid(10);
var snic = ee.Algorithms.Image.Segmentation.SNIC({
  image: construct_img.select('may_B2','may_B3','may_B4','may_B8'), 
  compactness: 0.1,  
  connectivity: 8,  
  neighborhoodSize: 256, 
  seeds: seeds
}).reproject({
  crs: "EPSG:4326",
  scale: 10
});

// Calculate the mean for each segment with respect to the pixels in that cluster
var clusters_snic = snic.select("clusters");
// Map.addLayer(clusters_snic.randomVisualizer(), {}, 'clusters')
clusters_snic = clusters_snic.reproject ({crs: clusters_snic.projection (), scale: 10});
// var clusters_snic2 = clusters_snic.float();
print(clusters_snic,'clusters');

//Export the image ojects to your Google Drive for viewing in a GIS.
//Export.image.toDrive({
  //image: clusters_snic,
    //description: "SNIC_Objects",
    //scale: 10,
    //folder: 'OBIA',
    //region: roi,
    //maxPixels: 10000000000000,
    //fileFormat: 'GeoTIFF'
//});

var composite_mean = EO_Stack.addBands(clusters_snic).reduceConnectedComponents(ee.Reducer.mean(), 'clusters', 256)
// var composite_mean = construct_img2.addBands(clusters_snic2)
print(composite_mean,'composit')
var final_bands = ee.Image.cat(composite_mean);
print(final_bands,'final')
// Define the training bands removing just the "clusters" bands.
var predictionBands=final_bands.bandNames().remove("clusters")
print(predictionBands,'predictionBands')

///////////////////////////////////////////////////////////////////////////////
///////////////////////     OBIA Train/Test Data    ///////////////////////////
///////////////////////////////////////////////////////////////////////////////

var OBIA_Val_Random = train_data.randomColumn('random');
var OBIA_split = 0.7
var OBIA_Train_Data = OBIA_Val_Random.filter(ee.Filter.lt('random',OBIA_split))
var OBIA_Test_Data = OBIA_Val_Random.filter(ee.Filter.gte('random',OBIA_split))
print(OBIA_Train_Data,'train_data')
print(OBIA_Test_Data,'test_data')

// Export.table.toAsset({
// 	collection:OBIA_Train_Data,
// 	description:'OBIA_Train_Data',
// 	assetId:'train_test_points',
// })
// Export.table.toAsset({
// 		collection:OBIA_Test_Data,
// 	description:'OBIA_Test_Data',
// 	assetId:'train_test_points',
// })

Export.table.toDrive({
  collection: OBIA_Train_Data,
  description: 'OBIA_Train_Data',
  fileFormat: 'SHP'
});
Export.table.toDrive({
  collection: OBIA_Test_Data,
  description: 'OBIA_Test_Data',
  fileFormat: 'SHP'
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////     OBIA Machine Learning    ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// Train the RF classifier.
var OBIA_Classifier_Model = ee.Classifier.smileRandomForest({
  numberOfTrees: 183,
//  bagFraction: 0.8
}).train({
  features: OBIA_Train_Data,
  classProperty: 'landcover',
  inputProperties: predictionBands
});

// Apply the RF classifier.
var OBIA_Classification = final_bands.classify(OBIA_Classifier_Model);
var class2=OBIA_Classification.clip(roi);

// Export the OBIA RF classification.
Export.image.toDrive({
    image: class2,
    description: "OBIA_Classification",
    scale: 10,
    folder: 'GEE',
    region: roi,
    maxPixels: 1e13, 
    fileFormat: 'GeoTIFF',
    crs: "EPSG:4326"
}); 

// /////////////////////////////////////////////////////////////////////////////////
// //////////////////////////     Accuracy Assessment    /////////////////////////
// /////////////////////////////////////////////////////////////////////////////////
// Get a confusion matrix and overall accuracy for the validation sample.
OBIA_Test_Data = OBIA_Test_Data.classify(OBIA_Classifier_Model);
var validationAccuracy = OBIA_Test_Data.errorMatrix('landcover', 'classification');
print('Validation error matrix', validationAccuracy); 
print('Validation accuracy', validationAccuracy.accuracy());
print('kappa accuracy', validationAccuracy.kappa());
