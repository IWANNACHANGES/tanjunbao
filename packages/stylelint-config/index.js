// stylelint rules : https://stylelint.io/user-guide/rules
// stylelint-config-standard: https://stylelint.io/user-guide/rules/list#stylistic-issues
// stylelint 不识别 scss 语法解决方案： https://github.com/stylelint/stylelint/issues/3190

module.exports = {
  extends: [],
  plugins: ["stylelint-order", "stylelint-scss", 'stylelint-less'],
  rules: {
    // stylelint-config-recommended
    'at-rule-no-unknown': true,
		'block-no-empty': true,
		'color-no-invalid-hex': true,
		'comment-no-empty': true,
		'custom-property-no-missing-var-function': true,
		'declaration-block-no-duplicate-custom-properties': true,
		'declaration-block-no-duplicate-properties': [
			true,
			{
				ignore: ['consecutive-duplicates-with-different-values'],
			},
		],
		'declaration-block-no-shorthand-property-overrides': true,
		'font-family-no-duplicate-names': true,
		'font-family-no-missing-generic-family-keyword': true,
		'function-linear-gradient-no-nonstandard-direction': true,
		'function-no-unknown': true,
		'keyframe-declaration-no-important': true,
		'media-feature-name-no-unknown': true,
		'named-grid-areas-no-invalid': true,
		'no-descending-specificity': true,
		'no-duplicate-at-import-rules': true,
		'no-duplicate-selectors': true,
		'no-empty-source': true,
		'no-extra-semicolons': true,
		'no-invalid-double-slash-comments': true,
		'no-invalid-position-at-import-rule': true,
		'no-irregular-whitespace': true,
		'property-no-unknown': true,
		'selector-pseudo-class-no-unknown': true,
		'selector-pseudo-element-no-unknown': true,
		'selector-type-no-unknown': [
			true,
			{
				ignore: ['custom-elements'],
			},
		],
		'string-no-newline': true,
		'unit-no-unknown': true,

    // stylelint-config-standard
    'alpha-value-notation': [
			'percentage',
			{
				exceptProperties: ['opacity'],
			},
		],
		'at-rule-empty-line-before': [
			'always',
			{
				except: ['blockless-after-same-name-blockless', 'first-nested'],
				ignore: ['after-comment'],
			},
		],
		'at-rule-name-case': 'lower',
		'at-rule-name-space-after': 'always-single-line',
		'at-rule-no-vendor-prefix': true,
		'at-rule-semicolon-newline-after': 'always',
		'block-closing-brace-empty-line-before': 'never',
		'block-closing-brace-newline-after': 'always',
		'block-closing-brace-newline-before': 'always-multi-line',
		'block-closing-brace-space-before': 'always-single-line',
		'block-opening-brace-newline-after': 'always-multi-line',
		'block-opening-brace-space-after': 'always-single-line',
		'block-opening-brace-space-before': 'always',
		'color-function-notation': 'modern',
		'color-hex-case': 'lower',
		'color-hex-length': 'short',
		'comment-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['stylelint-commands'],
			},
		],
		'comment-whitespace-inside': 'always',
		'custom-property-empty-line-before': [
			'always',
			{
				except: ['after-custom-property', 'first-nested'],
				ignore: ['after-comment', 'inside-single-line-block'],
			},
		],
		'custom-media-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message: 'Expected custom media query name to be kebab-case',
			},
		],
		'custom-property-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message: 'Expected custom property name to be kebab-case',
			},
		],
		'declaration-bang-space-after': 'never',
		'declaration-bang-space-before': 'always',
		'declaration-block-semicolon-newline-after': 'always-multi-line',
		'declaration-block-semicolon-space-after': 'always-single-line',
		'declaration-block-semicolon-space-before': 'never',
		'declaration-block-single-line-max-declarations': 1,
		'declaration-block-trailing-semicolon': 'always',
		'declaration-block-no-redundant-longhand-properties': true,
		'declaration-colon-newline-after': 'always-multi-line',
		'declaration-colon-space-after': 'always-single-line',
		'declaration-colon-space-before': 'never',
		'declaration-empty-line-before': [
			'always',
			{
				except: ['after-declaration', 'first-nested'],
				ignore: ['after-comment', 'inside-single-line-block'],
			},
		],
		'font-family-name-quotes': 'always-where-recommended',
		'function-comma-newline-after': 'always-multi-line',
		'function-comma-space-after': 'always-single-line',
		'function-comma-space-before': 'never',
		'function-max-empty-lines': 0,
		'function-name-case': 'lower',
		'function-parentheses-newline-inside': 'always-multi-line',
		'function-parentheses-space-inside': 'never-single-line',
		'function-url-quotes': 'always',
		'function-whitespace-after': 'always',
		'hue-degree-notation': 'angle',
		indentation: 2,
		'keyframes-name-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message: 'Expected keyframe name to be kebab-case',
			},
		],
		'length-zero-no-unit': true,
		'max-empty-lines': 1,
		'max-line-length': 120,
		'media-feature-colon-space-after': 'always',
		'media-feature-colon-space-before': 'never',
		'media-feature-name-case': 'lower',
		'media-feature-name-no-vendor-prefix': true,
		'media-feature-parentheses-space-inside': 'never',
		'media-feature-range-operator-space-after': 'always',
		'media-feature-range-operator-space-before': 'always',
		'media-query-list-comma-newline-after': 'always-multi-line',
		'media-query-list-comma-space-after': 'always-single-line',
		'media-query-list-comma-space-before': 'never',
		'no-empty-first-line': true,
		'no-eol-whitespace': true,
		'no-irregular-whitespace': true,
		'no-missing-end-of-source-newline': true,
		'number-leading-zero': 'always',
		'number-max-precision': 4,
		'number-no-trailing-zeros': true,
		'property-case': 'lower',
		'property-no-vendor-prefix': true,
		'rule-empty-line-before': [
			'always-multi-line',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
		'selector-attribute-brackets-space-inside': 'never',
		'selector-attribute-operator-space-after': 'never',
		'selector-attribute-operator-space-before': 'never',
		'selector-attribute-quotes': 'always',
		'selector-class-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message: 'Expected class selector to be kebab-case',
			},
		],
		'selector-combinator-space-after': 'always',
		'selector-combinator-space-before': 'always',
		'selector-descendant-combinator-no-non-space': true,
		'selector-id-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message: 'Expected id selector to be kebab-case',
			},
		],
		'selector-list-comma-newline-after': 'always',
		'selector-list-comma-space-before': 'never',
		'selector-max-empty-lines': 0,
		'selector-no-vendor-prefix': true,
		'selector-pseudo-class-case': 'lower',
		'selector-pseudo-class-parentheses-space-inside': 'never',
		'selector-pseudo-element-case': 'lower',
		'selector-pseudo-element-colon-notation': 'double',
		'selector-type-case': 'lower',
		'shorthand-property-no-redundant-values': true,
		'string-quotes': 'double',
		'unit-case': 'lower',
		'value-keyword-case': 'lower',
		'value-list-comma-newline-after': 'always-multi-line',
		'value-list-comma-space-after': 'always-single-line',
		'value-list-comma-space-before': 'never',
		'value-list-max-empty-lines': 0,
		'value-no-vendor-prefix': true,

		//
		'selector-pseudo-class-no-unknown': [
			true,
			{
			  ignorePseudoClasses: [
				'export',
				'import',
				'global',
				'local',
				'external',
			  ],
			},
		  ],
		  'selector-type-no-unknown': [
			true,
			{
			  ignoreTypes: ['from'],
			},
		  ],
		  'property-no-unknown': [
			true,
			{
			  ignoreProperties: ['composes', 'compose-with'],
			  ignoreSelectors: [':export', /^:import/],
			},
		  ],
		  'at-rule-no-unknown': [
			true,
			{
			  ignoreAtRules: ['value'],
			},
		  ],
		  'function-no-unknown': [
			true,
			{
			  ignoreFunctions: ['global'],
			},
		  ],

		"at-rule-no-unknown": null,
    "less/color-no-invalid-hex": true,
    "less/no-duplicate-variables": true,
    // 允许 ignoreTypes 里独有的标签作为 css 选择器
    "selector-type-no-unknown": [
      true,
      {
        ignore: ["custom-elements"],
        ignoreTypes: ["page"],
      },
    ],
    "no-duplicate-selectors": null,
    // fix stylelint 不识别 scss 语法
    // "at-rule-no-unknown": null,
    // fix stylelint 不识别 scss 语法
    // "scss/at-rule-no-unknown": true,
    // 忽略 rpx 的校验
    "unit-no-unknown": [
      true,
      {
        ignoreUnits: ["rpx"],
      },
    ],
    // 关闭声明块的冒号之后必须有换行符或不能有空白符
    "declaration-colon-newline-after": null,
    // 关闭逗号后需要新起一行
    "value-list-comma-newline-after": null,
    // 要求或禁止小于 1 的小数的前导 0
    "number-leading-zero": "always",
    // 在值列表的逗号之后要求有一个空格
    "value-list-comma-space-after": "always",
    /** 对空行的处理 */
    "declaration-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["after-declaration"],
      },
    ],
    // 关键词大小写
    "value-keyword-case": null,
    // 代码块之间需要换行
    "rule-empty-line-before": [
      "always",
      { except: ["after-single-line-comment", "first-nested"] },
    ],
    // 每行句末不允许有多余空格
    "no-eol-whitespace": true,
    // 大小写处理
    "unit-case": "lower",
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "color-named": "never",
    // 最多一行空行
    "max-empty-lines": 1,
    // "{" 前必须有空格
    "block-opening-brace-space-before": "always",
    // 属性名 : 前后是否要有空格
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",
    // 声明属性末尾 ";" 前不能有空格
    "declaration-block-semicolon-space-before": "never",
    // 选择器例如 ">、+、~" 前后必须要有空格
    "selector-combinator-space-before": "always",
    "selector-combinator-space-after": "always",
    // 注释相关
    "comment-no-empty": true,
    "no-empty-source": true,
    "no-descending-specificity": null,
    // plugins: stylelint-order
    /**
     * property list: https://www.tutorialrepublic.com/css-reference/css3-properties.php
     */
    "order/properties-order": [
      [
        {
          groupName: "Positioning",
          emptyLineBefore: "always",
          order: "flexible",
          properties: ["position", "top", "right", "bottom", "left", "z-index"],
        },
        {
          groupName: "Display & Box Model",
          emptyLineBefore: "always",
          order: "flexible",
          properties: [
            "box-sizing",
            "display",
            "overflow",
            "float",
            "visibility",
            "flex",
            "flex-direction",
            "flex-shrink",
            "align-items",
            "justify-content",
            "align-self",
            "flex-wrap",
            "width",
            "min-width",
            "max-width",
            "height",
            "min-height",
            "max-height",
            "margin",
            "margin-top",
            "margin-right",
            "margin-bottom",
            "margin-left",
            "border",
            "border-radius",
            "padding",
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left",
          ],
        },
        {
          groupName: "Font",
          emptyLineBefore: "always",
          order: "flexible",
          properties: [
            "font-family",
            "font-size",
            "color",
            "font-style",
            "font-weight",
            "text-align",
            "text-justify",
            "text-overflow",
            "line-height",
            "letter-spacing",
            "white-space",
            "word-break",
            "word-wrap",
            "white-space",
          ],
        },
        {
          groupName: "Color",
          emptyLineBefore: "always",
          order: "flexible",
          properties: [
            "box-shadow",
            "background",
            "background-color",
            "background-size",
            "background-origin",
            "background-repeat",
            "background-position",
            "background-image",
            "opacity",
            "transform",
            "translation",
            "animation",
          ],
        },
        {
          groupName: "Others",
          emptyLineBefore: "always",
          order: "flexible",
          properties: ["cursor"],
        },
      ],
    ],
  },
};
