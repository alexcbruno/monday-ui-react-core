import React, { forwardRef } from "react";
import cx from "classnames";
import useMergeRefs from "../../hooks/useMergeRefs";
import { ICON_TYPES } from "./IconConstants";
import CustomSvgIcon from "./CustomSvgIcon/CustomSvgIcon";
import FontIcon from "./FontIcon/FontIcon";
import useIconProps from "./hooks/useIconProps";
import VibeComponentProps from "../../interfaces/VibeComponentProps";
import VibeComponent from "../../interfaces/VibeComponent";
import "./Icon.scss";

const NOOP = (event: React.MouseEvent<HTMLButtonElement>) => {};

interface IconProps extends VibeComponentProps {
  onClick?: (event: React.MouseEvent) => void;
  icon: string | React.Component | null;
  clickable?: boolean;
  iconLabel?: string;
  iconType?: typeof ICON_TYPES[keyof typeof ICON_TYPES];
  iconSize?: number | string;
  ignoreFocusStyle?: boolean;
  tabindex?: number | string;
  ariaHidden?: boolean;
  style?: React.CSSProperties;
  useCurrentColor?: boolean;
  customColor?: string;
}

const Icon: VibeComponent<IconProps, HTMLElement> & { type?: typeof ICON_TYPES } = forwardRef(
  (
    {
      onClick = NOOP,
      /**
       * class name to be added to icon
       */
      className = "",
      /**
       * we support three types of icons - SVG, FONT and SRC (classname) so this prop is either the name of the icon or the component
       */
      icon = "",
      /**
       * Is icon is a button
       */
      clickable = true,
      /**
       * icon aria label support
       */
      iconLabel,
      /**
       *  the type of the component - svg, font or custom svg (using react-inlinesvg)
       */
      iconType = ICON_TYPES.SVG,
      /**
       * size for font icon
       */
      iconSize = 16,
      /**
       * remove focus style
       */
      ignoreFocusStyle = false,
      tabindex: externalTabIndex,
      /**
       * Hide icon asset from screen reader. No need to set value for this prop when clickable = false
       */
      ariaHidden,
      style,
      /**
       * when using svg from src (Icon.type.SRC) this boolean will transform the "fill" property to "currentColor"
       */
      useCurrentColor = false,
      /**
       * If you want to override to coloring of currentColor
       */
      customColor,
      "data-testid": dataTestId
    },
    ref
  ) => {
    const overrideExternalTabIndex = +externalTabIndex;
    const { screenReaderAccessProps, onClickCallback, computedClassName, iconRef } = useIconProps({
      onClick,
      iconLabel,
      clickable,
      className,
      isDecorationOnly: ariaHidden,
      ignoreFocusStyle,
      externalTabIndex: overrideExternalTabIndex
    });

    const mergedRef = useMergeRefs({ refs: [ref, iconRef] });

    if (!icon) {
      return null;
    }

    const isFunctionType = typeof icon === "function";
    if (iconType === ICON_TYPES.SVG || isFunctionType || typeof icon === "object") {
      const IconComponent = icon;
      return (
        // The icons are not converted to ts for js yet.
        // @ts-ignore
        <IconComponent
          {...screenReaderAccessProps}
          ref={isFunctionType ? undefined : mergedRef}
          size={iconSize.toString()}
          onClick={onClick}
          className={computedClassName}
          style={style}
          data-testid={dataTestId}
        />
      );
    }
    if (iconType === ICON_TYPES.SRC) {
      return (
        <CustomSvgIcon
          src={icon}
          {...screenReaderAccessProps}
          className={cx(computedClassName)}
          onClick={onClickCallback}
          style={style}
          replaceToCurrentColor={useCurrentColor}
          customColor={customColor}
          data-testid={dataTestId}
        />
      );
    }
    return (
      <FontIcon
        {...screenReaderAccessProps}
        className={cx(computedClassName)}
        onClick={onClickCallback}
        ref={mergedRef}
        icon={icon}
        data-testid={dataTestId}
      />
    );
  }
);

Icon.type = ICON_TYPES;

export default Icon;