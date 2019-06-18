// This provides 2 beta parameters to use to create a beta-PERT distribution as described by Vose, David (2000). Risk Analysis - a Quantitative Guide.
// Again, this JUST gives you the alpha1 and alpha2 (alpha and beta) parameters to define a Beta distribution following PERT. 
// I avoided using libraries like jstats so that I could run this in Google Sheets more easily.
// I avoided including the beta distribution portion in the appscript since there doesn't appear to be a native option.
// To generate a sample random number, use the 2 outputs as parameters in a beta distribution e.g. BETADIST(n,a1,a2)
// This was further modified to allow for changing the peakness (g) value per Vose's Modified Beta Pert https://www.vosesoftware.com/riskwiki/ModifiedPERTdistribution.php
// Thank you David Vose for taking it for a spin and correcting my density function for visualization!

// Example use
// Outcome: Call a random value that follows the beta distribution within user provided min,max,most likely
// BW2 is a cell containing the "minimum" estimate e.g. $1
// BW5 is a cell containing the "maximum" estimate e.g. $1,000,000
// BW3 is a cell containing the "most likely" estimate e.g. $750,000
// BW6 is a cell containing the "range" or max minus min e.g. $250,000
// Place in a cell "=betadist(rand(),INDEX(bpert(BW2,BW5,BW3,4),1),INDEX(bpert(BW2,BW5,BW3,4),2))*BW6+BW2"
// The in-cell function creates a beta distribution using the 1st and 2nd output of bpert() as the alpha1 and alpha2 beta parameters.
// The in-cell function ends with "...*BW6+BW2" in order to output a random sample instead of a probability. Remove this tail to generate a probability.

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