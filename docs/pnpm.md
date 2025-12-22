# Using pnpm

This project uses **pnpm** as its package manager for faster installs, better disk efficiency, and stricter dependency resolution.

## Why pnpm?

- ⚡ **Faster installs** - Up to 2x faster than npm
- 💾 **Efficient disk usage** - Uses hard links and a shared store, saving disk space
- 🔒 **Stricter dependency resolution** - Prevents phantom dependencies
- 📦 **Better monorepo support** - Excellent for workspace management

## Installation

If you don't have pnpm installed globally:

```bash
npm install -g pnpm
```

Or using the standalone installer:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## Basic Commands

All commands work the same as npm, just replace `npm` with `pnpm`:

```bash
# Install dependencies
pnpm install
# or simply
pnpm

# Add a dependency
pnpm add <package-name>

# Add a dev dependency
pnpm add -D <package-name>

# Remove a dependency
pnpm remove <package-name>

# Run scripts
pnpm run dev
pnpm run build
pnpm run start
```

## Common Workflows

### Installing Dependencies

```bash
# Install all dependencies from package.json
pnpm install

# Install a specific package
pnpm add react-query

# Install a dev dependency
pnpm add -D @types/node
```

### Running Scripts

```bash
# Development server
pnpm run dev

# Production build
pnpm run build

# Start production server
pnpm run start

# Format code
pnpm run format

# Type checking
pnpm run type-check
```

### Updating Dependencies

```bash
# Update all dependencies
pnpm update

# Update a specific package
pnpm update <package-name>

# Update to latest version (ignoring semver)
pnpm update <package-name> --latest
```

## Lock File

pnpm uses `pnpm-lock.yaml` instead of `package-lock.json`. This file should be committed to version control to ensure consistent installs across different environments.

## Build Scripts

Some packages may require build scripts to run. If pnpm warns about ignored build scripts, you can approve them:

```bash
pnpm approve-builds
```

This will prompt you to select which packages should be allowed to run build scripts.

## Migration from npm

If you're migrating an existing project:

1. Remove `node_modules` and `package-lock.json`:

    ```bash
    rm -rf node_modules package-lock.json
    ```

2. Install with pnpm:

    ```bash
    pnpm install
    ```

3. Update any scripts that reference `npm` to use `pnpm` instead

## Troubleshooting

### Clear pnpm store

If you encounter issues, you can clear the pnpm store:

```bash
pnpm store prune
```

### Check pnpm version

```bash
pnpm --version
```

## More Information

- [pnpm Documentation](https://pnpm.io/)
- [pnpm CLI Reference](https://pnpm.io/cli/add)
- [Why pnpm?](https://pnpm.io/motivation)
