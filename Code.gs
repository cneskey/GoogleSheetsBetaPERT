// This provides 2 beta parameters to use to create a beta-PERT distribution as described by Vose, David (2000). Risk Analysis - a Quantitative Guide.
// Again, this JUST gives you the alpha1 and alpha2 (alpha and beta) parameters to define a Beta distribution following PERT. 
// I avoided using libraries like jstats so that I could run this in Google Sheets more easily.
// I avoided including the beta distribution portion in the appscript since there doesn't appear to be a native option.
// To generate a sample random number, use the 2 outputs as parameters in a beta distribution e.g. BETADIST(n,a1,a2)
// This was further modified to allow for changing the peakness (g) value per Vose's Modified Beta Pert https://www.vosesoftware.com/riskwiki/ModifiedPERTdistribution.php
// Thank you David Vose for taking it for a spin and correcting my density function for visualization!

function bpert(min, max, most_likely, peak) {
  mean = ( min + max + peak * most_likely ) / ( peak + 2 );
  if( mean == most_likely ){
    a1 = ( peak / 2 ) + 1
  }
  else {
    a1 = (( mean - min ) * ( 2 * most_likely - min - max )) / (( most_likely - mean ) * ( max - min ));
  }
  a2 = ( a1 * ( max - mean )) / ( mean - min );
  return([a1,a2]);
}