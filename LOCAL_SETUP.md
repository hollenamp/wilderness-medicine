# Local database & legacy media setup

Use this when resetting a local environment so the database, storage symlink, and legacy images are in place.

```bash
# 1. Wipe DB, re-run migrations, seed (includes legacy blog/classes/store records)
php artisan migrate:fresh --seed

# 2. Symlink public storage (needed so /storage/... URLs work)
php artisan storage:link

# 3. Pull legacy images into storage (not in git; seed alone does not download them)
php artisan blog:import-legacy --download --insecure
php artisan classes:import-legacy --download --insecure
php artisan store:import-legacy --download --insecure
```

## Notes

- `migrate:fresh --seed` imports legacy **data** via the seeders; it does **not** fetch images.
- `--download` writes into `storage/app/public_html/`.
- `--insecure` is required because the legacy host serves an incomplete TLS certificate chain.
- `storage:link` only needs to run once per environment (unless the link was removed).
