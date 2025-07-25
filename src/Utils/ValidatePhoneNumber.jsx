export function validateMTN(telephone)
{
    var error;
    const firstDigits = parseInt(telephone.substring(1, 3)) 
    if(telephone.substring(0,1) != "6")
        error = true;
    else {
        if (firstDigits >= 50 && firstDigits <= 54) 
        error = false;
        else if(firstDigits >= 70 && firstDigits < 90)
        error = false;
        else
        error = true;
    }
    return error;
}

export function validateOrange(telephone)
{
    var error;
    const firstDigits = parseInt(telephone.substring(1, 3)) 
    if(telephone.substring(0,1) != "6")
        error = true;
    else {
    switch(true)
    {
        case (firstDigits >= 55 && firstDigits < 60): 
        error = false;
        break;
        case (firstDigits >= 90 && firstDigits <= 99):
        error = false;
        break;
        default :
        error = true;
        }
    }
    return error;
}

export function validateCamtel(telephone)
{
    var error;
    const firstDigits = parseInt(telephone.substring(1, 3)) 
    if(telephone.substring(0,1) != "6")
    error = true;
    else {
    switch(true){
    case (firstDigits >= 20 && firstDigits < 30): 
    error = false;
    break;
    // case (firstDigits >= 90 && firstDigits <= 99):
    // error = false;
    // break;
    default :
    error = true;
    }
}
return error;   
}