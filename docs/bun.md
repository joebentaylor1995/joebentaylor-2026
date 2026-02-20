# Using Bun

This project uses **Bun** as its package manager and runtime for fast installs, native TypeScript support, and a single toolchain.

## Why Bun?

- ⚡ **Very fast installs** – Much faster than npm and pnpm
- 🦎 **All-in-one** – Package manager, bundler, test runner, and runtime
- 📦 **npm-compatible** – Works with existing package.json and node_modules
- 🔒 **Lockfile** – `bun.lock` ensures reproducible installs

## Installation

Install Bun (if you don't have it):

```bash
curl -fsSL https://bun.sh/install | bash
```

Or on macOS with Homebrew:

```bash
brew install oven-sh/bun/bun
```

## Basic Commands

Replace `npm` / `pnpm` with `bun`:

```bash
# Install dependencies
bun install
# or simply
bun

# Add a dependency
bun add <package-name>

# Add a dev dependency
bun add -d <package-name>

# Remove a dependency
bun remove <package-name>

# Run scripts
bun run dev
bun run build
bun run start
# or shorthand (if no conflict with script name):
bun dev
bun build
bun start
```

## Common Workflows

### Installing Dependencies

```bash
# Install all dependencies from package.json
bun install

# Add a specific package
bun add react-query

# Add a dev dependency
bun add -d @types/node
```

### Running Scripts

```bash
# Development server
bun run dev

# Production build
bun run build

# Start production server
bun run start

# Format code
bun run format

# Type checking
bun run type-check
```

### Checking for Updates

```bash
# Check which packages are outdated
bun outdated

# Update all dependencies (respects semver in package.json)
bun update

# Update a specific package
bun update <package-name>
```

## Lock File

Bun uses `bun.lock`. Commit it to version control for consistent installs across environments.

## Migration from npm / pnpm

1. Remove existing lockfile and node_modules:

    ```bash
    rm -rf node_modules package-lock.json pnpm-lock.yaml
    ```

2. Install with Bun:

    ```bash
    bun install
    ```

3. Update any scripts or docs that reference `npm` or `pnpm` to use `bun`.

## Overrides

To force specific dependency versions (e.g. for security or deprecations), use the standard `overrides` field in `package.json`:

```json
{
  "overrides": {
    "package-name": "version"
  }
}
```

Bun respects this field like npm.

## Troubleshooting

### Clear Bun cache

```bash
bun pm cache rm
```

### Check Bun version

```bash
bun --version
```

## More Information

- [Bun Documentation](https://bun.sh/docs)
- [Bun Package Manager](https://bun.sh/docs/cli/install)
