// This provides 2 beta parameters to use to create a beta-PERT distribution as described by Vose, David (2000). Risk Analysis - a Quantitative Guide.
// I avoided using libraries like jstats so that I could run this in Google Sheets more easily.
// To generate a sample random number, use the 2 outputs as parameters in a beta distribution.
// This was converted from Vose's R equivalent https://www.vosesoftware.com/riskwiki/PERTdistribution.php
// This was further modified to allow for changing the skewness value per Vose's Modified Beta Pert https://www.vosesoftware.com/riskwiki/ModifiedPERTdistribution.php
// Thank you David Vose for taking it for a spin and correcting my density function for visualization!

function bpert(n, min, max, mode, skew) {
  range = max - min;
  if( range == 0 ){
    return( repeat( min, n ));
                   }
  mean = ( min + max + skew * mode ) / ( skew + 2 );
  if( mean == mode ){
    a1 = ( skew / 2 ) + 1
  }
  else {
    a1 = (( mean - min ) * ( 2 * mode - min - max )) / (( mode - mean ) * ( max - min ));
  }
  a2 = ( a1 * ( max - mean )) / ( mean - min );
  return([a1,a2]);
}