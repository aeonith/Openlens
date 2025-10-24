# Background Images

## How to Upload Your Own Rock Background

### Option 1: Use this folder (Recommended)

1. Find a rock texture image you like (Google: "gray rock texture")
2. Save it as `rock-background.jpg` or `rock-background.png`
3. Put it in this folder: `public/images/`
4. Update `src/app/globals.css` line 13:
   ```css
   background-image: url('/images/rock-background.jpg');
   ```

### Option 2: Use Unsplash (Current - Online)

Currently using: https://images.unsplash.com/photo-1518732114293-4d8dd604aa3c?w=1920&q=80

**To change:**
1. Go to https://unsplash.com/s/photos/rock-texture
2. Find image you like
3. Right click → Copy image URL
4. Update `src/app/globals.css` line 13 with new URL

### Best Image Specs

- **Size:** 1920x1080 or larger
- **Format:** JPG (smaller file) or PNG (better quality)
- **Type:** Gray rock texture, stone wall, concrete
- **Tone:** Dark gray (#2a2a2a to #4a4a4a range)

### Example File Path Structure

```
public/
  images/
    rock-background.jpg          ← Your custom background
    rock-background-alt.png      ← Alternative background
    README.md                    ← This file
```

### After Adding Image

```bash
git add public/images/rock-background.jpg
git commit -m "Add custom rock background"
git push origin main
```

Then update the CSS to use: `url('/images/rock-background.jpg')`
