import semanticRelease from 'semantic-release';

async function getNextVersion() {
  const result = await semanticRelease(
    {
      branches: ['main'],
      repositoryUrl: 'https://github.com/tovmassian/semantic-release-test.git',
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
      cwd: process.cwd(),
      env: { ...process.env, CI: true },
    }
  );

  if (result) {
    console.log(``);
  } else {
    console.log(result ? result.nextRelease.version : 'No release needed.');
  }
}

getNextVersion().catch(console.error);
