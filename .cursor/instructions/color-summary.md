# Color Tokens Structure
## Basic Layer — oklch
- Red — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Orange — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Amber — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Yellow — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Lime — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Green — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Emerald — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Teal — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Cyan — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Sky — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Blue — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Indigo — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Violet — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Purple — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Fuchsia — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Pink — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Rose — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Slate — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Gray — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Zinc — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Neutral — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
- Stone — [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
## Semantic Layer — variables (references Basic Layer)
- background — [primary, secondary, brand, success, info, warning, critical, inverted]
- foreground — [primary, secondary, brand, success, info, warning, critical, inverted]
- border — [primary, secondary, brand, success, info, warning, critical, inverted]
## Component Layer — variables (references Semantic Layer)
Specific for each component for e.g.:
### Component  Button (variant Filled, Brand)
- background for [each specific state] — button_background_filled_brand_[default, hover, onClick, disabled]
- text for [each specific state] — button_text_filled_brand_[default, hover, onClick, disabled]
- icon for [each specific state] — button_icon_filled_brand_[default, hover, onClick, disabled]

