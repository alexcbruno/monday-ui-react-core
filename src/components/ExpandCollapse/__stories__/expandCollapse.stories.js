import React from "react";
import { action } from '@storybook/addon-actions';
import { text, number } from "@storybook/addon-knobs";
import { withPerformance } from "storybook-addon-performance";
import ExpandCollapse from "../ExpandCollapse";
import Icon from "../../Icon/Icon";
import Robot from "../../Icon/Icons/components/Robot";
import "./expandCollapse.stories.scss"

export const Sandbox = () => {
    const width = number("width", 500);
    const height = number("height", 200);

    return (<div style={{ width, height }}>
        <ExpandCollapse 
        headerComponentRenderer={() => <h2><b>I can be anything</b></h2>}>
            <h2>insert any component you want</h2>
            <p>here is a robot for you</p>
            <Icon iconType={Icon.type.SVG} icon={Robot} iconSize={"52px"} tabindex="-1" clickable={true} />
        </ExpandCollapse>
    </div>);
};

export const OpenByDefault = () => (
    <div>
        <ExpandCollapse 
        className="expandCollapse"
        defaultOpenState={true}
        headerComponentRenderer={() => <h1>Any component you want</h1>}>
            <Icon iconType={Icon.type.SVG} icon={Robot} iconSize={"52px"} tabindex="-1" clickable={true} />
        </ExpandCollapse>
    </div>
);

export default {
    title: "Components/ExpandCollapse",
    component: ExpandCollapse,
    decorators: [withPerformance]

};
