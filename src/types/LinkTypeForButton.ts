import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LinkProps } from "react-router-dom";

// Need to add "symbol" to fix type mismatch in Button "as" prop.
type LinkTypeForButton = ForwardRefExoticComponent<
  LinkProps & RefAttributes<HTMLAnchorElement>
> &
  "symbol";

export default LinkTypeForButton;
