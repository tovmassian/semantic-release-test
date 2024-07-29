const semanticRelease = require('semantic-release');

async function getNextVersion() {
  const result = await semanticRelease(
    {
      branches: ['main'],
      repositoryUrl: 'https://github.com/yourusername/your-repository.git',
      plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        {
          // Dummy publisher to avoid actual publishing
          path: '@semantic-release/npm',
          npmPublish: false,
        },
      ],
      dryRun: true,
    },
    {
      // This is necessary to avoid the ERELEASEBRANCHES error on non-main branches
      cwd: process.cwd(),
      env: { ...process.env, CI: true },
    }
  );

  if (result) {
    console.log(`version=${result.nextRelease.version} >> $GITHUB_OUTPUT`);
  } else {
    console.log('No release needed.');
  }
}

getNextVersion().catch(console.error);
