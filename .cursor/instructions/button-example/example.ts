import { j as u } from "./jsx-runtime-DF92TKtx.js";
import { r as S } from "./index-DiS2ATIB.js";
import { c as x } from "./classnames-jAnT5fwt.js";
import { g as N } from "./getDataTestId-CtlxLov0.js";
import { L as H, a as w } from "./Loader-DwpBrg3R.js";
import { g as r } from "./getShadowBorder-Du_2P5Bo.js";
import { s as _, t as o } from "./stitches.config.es-D33rOtOO.js";
import { B } from "./Button-Bs8teJG9.js";
import { L as $ } from "./Loader-CHqy2T_Y.js";
import { c as L } from "./componentToString-FeUherIV.js";
import { c as D } from "./componentClassname-Bx_MaieP.js";
const E = _(B.Container, {
        "&:disabled": { cursor: "not-allowed" },
        "&:focus-visible": { outline: `2px solid ${o.colors.brand_primary}`, outlineOffset: "1px" },
        [`& ${H.Container}`]: { position: "absolute" },
        variants: {
            isLoading: {
                true: {
                    color: `${o.colors.transparent_primary}!important`,
                    "& svg": { fill: `${o.colors.transparent_primary}!important` },
                },
            },
            $disabled: { true: { cursor: "not-allowed" } },
            variant: {
                filled: { color: o.colors.button_filled_text, "& svg": { fill: o.colors.button_filled_icon } },
                outlined: {},
                tonned: {},
                transparent: {},
            },
            colorScheme: {
                brand: {},
                success: {},
                info: {},
                warning: {},
                critical: {},
                draft: {},
                constant: {},
                primary: {},
            },
        },
        compoundVariants: [
            {
                variant: "filled",
                colorScheme: "brand",
                css: {
                    background: o.colors.button_filled_brand_bodyNormal,
                    color: o.colors.brand_text_primary,
                    "& svg": { fill: o.colors.brand_icon_primary },
                    [`& ${w}`]: { stroke: o.colors.brand_icon_primary },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_filled_brand_bodyHover } },
                    "&:active": { background: o.colors.button_filled_brand_bodyClick },
                },
            },
            {
                variant: "filled",
                colorScheme: "success",
                css: {
                    background: o.colors.button_filled_success_bodyNormal,
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_filled_success_bodyHover } },
                    "&:active": { background: o.colors.button_filled_success_bodyClick },
                },
            },
            {
                variant: "filled",
                colorScheme: "info",
                css: {
                    background: o.colors.button_filled_info_bodyNormal,
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_filled_info_bodyHover } },
                    "&:active": { background: o.colors.button_filled_info_bodyClick },
                },
            },
            {
                variant: "filled",
                colorScheme: "warning",
                css: {
                    background: o.colors.button_filled_warning_bodyNormal,
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_filled_warning_bodyHover } },
                    "&:active": { background: o.colors.button_filled_warning_bodyClick },
                },
            },
            {
                variant: "filled",
                colorScheme: "critical",
                css: {
                    background: o.colors.button_filled_critical_bodyNormal,
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_filled_critical_bodyHover } },
                    "&:active": { background: o.colors.button_filled_critical_bodyClick },
                },
            },
            {
                variant: "filled",
                colorScheme: "draft",
                css: {
                    background: o.colors.button_filled_neutral_bodyNormal,
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_filled_neutral_bodyHover } },
                    "&:active": { background: o.colors.button_filled_neutral_bodyClick },
                },
            },
            {
                variant: "filled",
                colorScheme: "constant",
                css: {
                    color: o.colors.button_filled_constant_text,
                    background: o.colors.button_filled_constant_bodyNormal,
                    "& svg": { fill: o.colors.button_filled_constant_icon },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_filled_constant_bodyHover } },
                    "&:active": { background: o.colors.button_filled_constant_bodyClick },
                },
            },
            {
                variant: "filled",
                colorScheme: "primary",
                css: {
                    color: o.colors.button_filled_primary_text,
                    background: o.colors.button_filled_primary_bodyNormal,
                    "& svg": { fill: o.colors.button_filled_primary_icon },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_filled_primary_bodyHover } },
                    "&:active": { background: o.colors.button_filled_primary_bodyClick },
                },
            },
            {
                variant: "tonned",
                colorScheme: "brand",
                css: {
                    color: o.colors.brand_primary,
                    background: o.colors.button_tonned_brand_bodyNormal,
                    "& svg": { fill: o.colors.brand_primary },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_tonned_brand_bodyHover } },
                    "&:active": { background: o.colors.button_tonned_brand_bodyClick },
                },
            },
            {
                variant: "tonned",
                colorScheme: "success",
                css: {
                    color: o.colors.button_tonned_success_text,
                    background: o.colors.button_tonned_success_bodyNormal,
                    "& svg": { fill: o.colors.button_tonned_success_icon },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_tonned_success_bodyHover } },
                    "&:active": { background: o.colors.button_tonned_success_bodyClick },
                },
            },
            {
                variant: "tonned",
                colorScheme: "info",
                css: {
                    color: o.colors.button_tonned_info_text,
                    background: o.colors.button_tonned_info_bodyNormal,
                    "& svg": { fill: o.colors.button_tonned_info_icon },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_tonned_info_bodyHover } },
                    "&:active": { background: o.colors.button_tonned_info_bodyClick },
                },
            },
            {
                variant: "tonned",
                colorScheme: "warning",
                css: {
                    color: o.colors.button_tonned_warning_text,
                    background: o.colors.button_tonned_warning_bodyNormal,
                    "& svg": { fill: o.colors.button_tonned_warning_icon },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_tonned_warning_bodyHover } },
                    "&:active": { background: o.colors.button_tonned_warning_bodyClick },
                },
            },
            {
                variant: "tonned",
                colorScheme: "critical",
                css: {
                    color: o.colors.button_tonned_critical_text,
                    background: o.colors.button_tonned_critical_bodyNormal,
                    "& svg": { fill: o.colors.button_tonned_critical_icon },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_tonned_critical_bodyHover } },
                    "&:active": { background: o.colors.button_tonned_critical_bodyClick },
                },
            },
            {
                variant: "tonned",
                colorScheme: "draft",
                css: {
                    color: o.colors.button_tonned_neutral_text,
                    background: o.colors.button_tonned_neutral_bodyNormal,
                    "& svg": { fill: o.colors.button_tonned_neutral_icon },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_tonned_neutral_bodyHover } },
                    "&:active": { background: o.colors.button_tonned_neutral_bodyClick },
                },
            },
            {
                variant: "tonned",
                colorScheme: "constant",
                css: {
                    color: o.colors.button_tonned_constant_text,
                    background: o.colors.button_tonned_constant_bodyNormal,
                    "& svg": { fill: o.colors.button_tonned_constant_icon },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_tonned_constant_bodyHover } },
                    "&:active": { background: o.colors.button_tonned_constant_bodyClick },
                },
            },
            {
                variant: "tonned",
                colorScheme: "primary",
                css: {
                    background: o.colors.button_tonned_primary_bodyNormal,
                    color: o.colors.button_tonned_primary_text,
                    "& svg": { fill: o.colors.button_tonned_primary_icon },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_tonned_primary_bodyHover } },
                    "&:active": { background: o.colors.button_tonned_primary_bodyClick },
                },
            },
            {
                variant: "transparent",
                colorScheme: "brand",
                css: {
                    color: o.colors.brand_primary,
                    "& svg": { fill: o.colors.brand_primary },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_transparent_brand_bodyHover } },
                    "&:active": { background: o.colors.button_transparent_brand_bodyClick },
                },
            },
            {
                variant: "transparent",
                colorScheme: "success",
                css: {
                    color: o.colors.button_transparent_success_text,
                    "& svg": { fill: o.colors.button_transparent_success_icon },
                    "@media (hover: hover)": {
                        "&:hover": { background: o.colors.button_transparent_success_bodyHover },
                    },
                    "&:active": { background: o.colors.button_transparent_success_bodyClick },
                },
            },
            {
                variant: "transparent",
                colorScheme: "info",
                css: {
                    color: o.colors.button_transparent_info_text,
                    "& svg": { fill: o.colors.button_transparent_info_icon },
                    "@media (hover: hover)": { "&:hover": { background: o.colors.button_transparent_info_bodyHover } },
                    "&:active": { background: o.colors.button_transparent_info_bodyClick },
                },
            },
            {
                variant: "transparent",
                colorScheme: "warning",
                css: {
                    color: o.colors.button_transparent_warning_text,
                    "& svg": { fill: o.colors.button_transparent_warning_icon },
                    "@media (hover: hover)": {
                        "&:hover": { background: o.colors.button_transparent_warning_bodyHover },
                    },
                    "&:active": { background: o.colors.button_transparent_warning_bodyClick },
                },
            },
            {
                variant: "transparent",
                colorScheme: "critical",
                css: {
                    color: o.colors.button_transparent_critical_text,
                    "& svg": { fill: o.colors.button_transparent_critical_icon },
                    "@media (hover: hover)": {
                        "&:hover": { background: o.colors.button_transparent_critical_bodyHover },
                    },
                    "&:active": { background: o.colors.button_transparent_critical_bodyClick },
                },
            },
            {
                variant: "transparent",
                colorScheme: "draft",
                css: {
                    color: o.colors.button_transparent_neutral_text,
                    "& svg": { fill: o.colors.button_transparent_neutral_icon },
                    "@media (hover: hover)": {
                        "&:hover": { background: o.colors.button_transparent_neutral_bodyHover },
                    },
                    "&:active": { background: o.colors.button_transparent_neutral_bodyClick },
                },
            },
            {
                variant: "transparent",
                colorScheme: "constant",
                css: {
                    background: o.colors.button_transparent_bodyNormal,
                    color: o.colors.button_transparent_constant_text,
                    "@media (hover: hover)": {
                        "&:hover": { background: o.colors.button_transparent_constant_bodyHover },
                    },
                    "&:active": { background: o.colors.button_transparent_constant_bodyClick },
                    "& svg": { fill: o.colors.button_transparent_constant_icon },
                },
            },
            {
                variant: "transparent",
                colorScheme: "primary",
                css: {
                    color: o.colors.button_transparent_primary_text,
                    "@media (hover: hover)": {
                        "&:hover": { background: o.colors.button_transparent_primary_bodyHover },
                    },
                    "&:active": { background: o.colors.button_transparent_primary_bodyClick },
                    "& svg": { fill: o.colors.button_transparent_primary_icon },
                },
            },
            {
                variant: "outlined",
                colorScheme: "brand",
                css: {
                    color: o.colors.brand_primary,
                    "& svg": { fill: o.colors.brand_primary },
                    ...r(2, o.colors.button_outlined_brand_borderNormal),
                    "@media (hover: hover)": { "&:hover": { ...r(2, o.colors.button_outlined_brand_borderHover) } },
                    "&:active": { ...r(2, o.colors.button_outlined_brand_borderClick) },
                },
            },
            {
                variant: "outlined",
                colorScheme: "success",
                css: {
                    color: o.colors.button_outlined_success_text,
                    "& svg": { fill: o.colors.button_outlined_success_icon },
                    ...r(2, o.colors.button_outlined_success_borderNormal),
                    "@media (hover: hover)": { "&:hover": { ...r(2, o.colors.button_outlined_success_borderHover) } },
                    "&:active": { ...r(2, o.colors.button_outlined_success_borderClick) },
                },
            },
            {
                variant: "outlined",
                colorScheme: "info",
                css: {
                    color: o.colors.button_outlined_info_text,
                    "& svg": { fill: o.colors.button_outlined_info_icon },
                    ...r(2, o.colors.button_outlined_info_borderNormal),
                    "@media (hover: hover)": { "&:hover": { ...r(2, o.colors.button_outlined_info_borderHover) } },
                    "&:active": { ...r(2, o.colors.button_outlined_info_borderClick) },
                },
            },
            {
                variant: "outlined",
                colorScheme: "warning",
                css: {
                    color: o.colors.button_outlined_warning_text,
                    "& svg": { fill: o.colors.button_outlined_warning_icon },
                    ...r(2, o.colors.button_outlined_warning_borderNormal),
                    "@media (hover: hover)": { "&:hover": { ...r(2, o.colors.button_outlined_warning_borderHover) } },
                    "&:active": { ...r(2, o.colors.button_outlined_warning_borderClick) },
                },
            },
            {
                variant: "outlined",
                colorScheme: "critical",
                css: {
                    color: o.colors.button_outlined_critical_text,
                    "& svg": { fill: o.colors.button_outlined_critical_icon },
                    ...r(2, o.colors.button_outlined_critical_borderNormal),
                    "@media (hover: hover)": { "&:hover": { ...r(2, o.colors.button_outlined_critical_borderHover) } },
                    "&:active": { ...r(2, o.colors.button_outlined_critical_borderClick) },
                },
            },
            {
                variant: "outlined",
                colorScheme: "draft",
                css: {
                    color: o.colors.button_outlined_neutral_text,
                    "& svg": { fill: o.colors.button_outlined_neutral_icon },
                    ...r(2, o.colors.button_outlined_neutral_borderNormal),
                    "@media (hover: hover)": { "&:hover": { ...r(2, o.colors.button_outlined_neutral_borderHover) } },
                    "&:active": { ...r(2, o.colors.button_outlined_neutral_borderClick) },
                },
            },
            {
                variant: "outlined",
                colorScheme: "constant",
                css: {
                    color: o.colors.button_outlined_constant_text,
                    "& svg": { fill: o.colors.button_outlined_constant_icon },
                    ...r(2, o.colors.button_outlined_constant_borderNormal),
                    "@media (hover: hover)": { "&:hover": { ...r(2, o.colors.button_outlined_constant_borderHover) } },
                    "&:active": { ...r(2, o.colors.button_outlined_constant_borderClick) },
                },
            },
            {
                variant: "outlined",
                colorScheme: "primary",
                css: {
                    color: o.colors.button_outlined_primary_text,
                    ...r(2, o.colors.button_outlined_primary_borderNormal),
                    "& svg": { fill: o.colors.button_outlined_primary_icon },
                    "@media (hover: hover)": { "&:hover": { ...r(2, o.colors.button_outlined_primary_borderHover) } },
                    "&:active": { ...r(2, o.colors.button_outlined_primary_borderClick) },
                },
            },
            {
                $disabled: !0,
                variant: "filled",
                css: {
                    "&&, &&:active, &&:hover": {
                        background: o.colors.neutral32,
                        color: o.colors.constant70,
                        "& svg": { fill: o.colors.constant70 },
                    },
                },
            },
            {
                $disabled: !0,
                variant: "filled",
                colorScheme: "constant",
                css: {
                    "&&, &&:active, &&:hover": {
                        background: o.colors.constant32,
                        color: o.colors.primary70,
                        "& svg": { fill: o.colors.primary70 },
                    },
                },
            },
            {
                $disabled: !0,
                variant: "tonned",
                css: {
                    "&&, &&:active, &&:hover": {
                        background: o.colors.neutral4,
                        color: o.colors.neutral40,
                        "& svg": { fill: o.colors.neutral40 },
                    },
                },
            },
            {
                $disabled: !0,
                variant: "tonned",
                colorScheme: "constant",
                css: {
                    "&&, &&:active, &&:hover": {
                        background: o.colors.constant8,
                        color: o.colors.constant40,
                        "& svg": { fill: o.colors.constant40 },
                    },
                },
            },
            {
                $disabled: !0,
                variant: "transparent",
                css: {
                    "&&, &&:active, &&:hover": {
                        background: o.colors.button_transparent_bodyNormal,
                        color: o.colors.neutral40,
                        "& svg": { fill: o.colors.neutral40 },
                    },
                },
            },
            {
                $disabled: !0,
                variant: "transparent",
                colorScheme: "constant",
                css: {
                    "&&, &&:active, &&:hover": {
                        background: o.colors.button_transparent_bodyNormal,
                        color: o.colors.constant40,
                        "& svg": { fill: o.colors.constant40 },
                    },
                },
            },
            {
                $disabled: !0,
                variant: "outlined",
                css: {
                    "&&, &&:active, &&:hover": {
                        background: o.colors.button_outlined_body,
                        color: o.colors.neutral32,
                        ...r(2, o.colors.neutral32),
                        "& svg": { fill: o.colors.neutral32 },
                    },
                },
            },
            {
                $disabled: !0,
                variant: "outlined",
                colorScheme: "constant",
                css: {
                    "&&, &&:active, &&:hover": {
                        background: o.colors.button_outlined_body,
                        color: o.colors.constant32,
                        ...r(2, o.colors.constant32),
                        "& svg": { fill: o.colors.constant32 },
                    },
                },
            },
        ],
        defaultVariants: { variant: "filled", colorScheme: "brand", isLoading: "false", $disabled: "false" },
    }),
    V = _("span", { display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }),
    b = D("button"),
    l = S.forwardRef(
        (
            {
                children: c,
                dataTestId: v,
                className: m,
                color: f,
                colorScheme: t,
                size: n,
                typography: e,
                wide: h,
                fullWidth: g,
                isLoading: i,
                variant: a = "filled",
                disabled: s,
                onClick: p,
                ...d
            },
            y
        ) => {
            function k() {
                if (e === "bodyS" || n === "bodyS") return `${o.sizes.x4}`;
                if (e === "bodyM" || n === "bodyM") return `${o.sizes.x5}`;
                if (e === "bodyL" || n === "bodyL") return `${o.sizes.x6}`;
            }
            const C = () =>
                a === "filled" && t === "primary"
                    ? "inverted"
                    : a === "filled" && t === "constant"
                      ? "constantPrimary"
                      : a === "filled"
                        ? "constant"
                        : t;
            return u.jsx(E, {
                "data-test-id": N(d["data-test-id"] || v, "Button"),
                colorScheme: t || f,
                type: "button",
                typography: e || n,
                fullWidth: g || h,
                variant: a,
                isLoading: i,
                disabled: s,
                $disabled: s,
                onClick: i ? void 0 : p,
                ...d,
                ref: y,
                className: x(m, b),
                children: i
                    ? u.jsxs(V, { children: [c, u.jsx($, { colorScheme: C(), size: k(), "data-loader": !0 })] })
                    : c,
            });
        }
    );
l.toString = L(b);
l.displayName = "Button";
try {
    (l.displayName = "Button"),
        (l.__docgenInfo = {
            description: "",
            displayName: "Button",
            props: {
                colorScheme: {
                    defaultValue: null,
                    description: "",
                    name: "colorScheme",
                    required: !1,
                    type: {
                        name: '"brand" | "success" | "info" | "warning" | "critical" | "draft" | "constant" | "primary" | ({ "@xxs"?: "brand" | "success" | "info" | "warning" | "critical" | "draft" | "constant" | "primary"; ... 5 more ...; "@initial"?: "brand" | ... 7 more ...; } & { ...; }) | undefined',
                    },
                },
                isLoading: {
                    defaultValue: null,
                    description: "",
                    name: "isLoading",
                    required: !1,
                    type: {
                        name: 'boolean | "true" | ({ "@xxs"?: boolean | "true"; "@xs"?: boolean | "true"; "@sm"?: boolean | "true" | undefined; "@md"?: boolean | "true" | undefined; "@lg"?: boolean | "true" | undefined; "@xl"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ....',
                    },
                },
                variant: {
                    defaultValue: { value: "filled" },
                    description: "",
                    name: "variant",
                    required: !1,
                    type: {
                        name: '"transparent" | "filled" | "outlined" | "tonned" | ({ "@xxs"?: "transparent" | "filled" | "outlined" | "tonned"; "@xs"?: "transparent" | "filled" | "outlined" | "tonned"; ... 4 more ...; "@initial"?: "transparent" | ... 3 more ... | undefined; } & { ...; }) | undefined',
                    },
                },
                dataTestId: {
                    defaultValue: null,
                    description: `ID элемента для авто-тестов.
<mark>Устарел.</mark> Используйте <code>data-test-id</code>
@deprecated`,
                    name: "dataTestId",
                    required: !1,
                    type: { name: "string" },
                },
                color: {
                    defaultValue: null,
                    description: `Цвет элемента.
<mark>Устарел.</mark> Используйте <code>colorScheme</code>
@deprecated`,
                    name: "color",
                    required: !1,
                    type: {
                        name: "enum",
                        value: [
                            { value: '"brand"' },
                            { value: '"success"' },
                            { value: '"info"' },
                            { value: '"warning"' },
                            { value: '"critical"' },
                            { value: '"draft"' },
                            { value: '"constant"' },
                            { value: '"primary"' },
                        ],
                    },
                },
                size: {
                    defaultValue: null,
                    description: `Размер элемента.
<mark>Устарел.</mark> Используйте <code>typography</code>
@deprecated`,
                    name: "size",
                    required: !1,
                    type: { name: "enum", value: [{ value: '"bodyL"' }, { value: '"bodyM"' }, { value: '"bodyS"' }] },
                },
                wide: {
                    defaultValue: null,
                    description: `Размер элемента.
<mark>Устарел.</mark> Используйте <code>fullWidth</code>
@deprecated`,
                    name: "wide",
                    required: !1,
                    type: {
                        name: "enum",
                        value: [{ value: '"adaptive"' }, { value: '"enable"' }, { value: '"disable"' }],
                    },
                },
                "data-test-id": {
                    defaultValue: null,
                    description: "ID элемента для авто-тестов",
                    name: "data-test-id",
                    required: !1,
                    type: { name: "string" },
                },
            },
        });
} catch {}
export { l as B };
